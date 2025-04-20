import json
import difflib
import spacy
import re
from typing import List, Dict, Any, Optional, Set, Tuple

# Load spaCy model with improved vectors
nlp = spacy.load("en_core_web_md")

# Load NGO data
def load_ngos():
    with open("data/ngos.json", "r", encoding="utf-8") as f:
        return json.load(f)

# Load FAQ data
def load_faqs():
    with open("data/faq.json", "r", encoding="utf-8") as f:
        return json.load(f)

# Enhanced FAQ matching with improved similarity scoring
def match_faqs(user_message: str) -> Optional[str]:
    faqs = load_faqs()
    user_message = user_message.lower().strip()
    
    # 1. Direct matching for common greetings (highest priority)
    greeting_patterns = ["hello", "hi ", "hey", "hi,", "hey,", "hello,", "greetings", "what's up"]
    if any(user_message.startswith(pattern) for pattern in greeting_patterns) or user_message in greeting_patterns:
        # Match greeting FAQs first
        for faq in faqs:
            if faq["question"].lower() in ["hello", "hi", "hey"] and len(user_message) < 10:
                return faq["answer"]
    
    # 2. Check for conversation starters about the bot
    bot_queries = ["how are you", "who are you", "what can you do", "what do you do"]
    for query in bot_queries:
        if query in user_message:
            for faq in faqs:
                if faq["question"].lower() == query:
                    return faq["answer"]
    
    # 3. Check for thanks/gratitude
    if any(word in user_message for word in ["thanks", "thank you", "appreciate it"]):
        for faq in faqs:
            if faq["question"].lower() in ["thanks", "thank you"]:
                return faq["answer"]
    
    # 4. Detect clear NGO category requests - these should NOT match FAQs
    ngo_indicators = [
        "help with", "donate to", "support", "find ngo", "recommend", 
        "organizations for", "charities for"
    ]
    cause_keywords = [
        "animal", "education", "health", "environment", "women", "disaster", 
        "hunger", "child", "elderly", "senior", "poor", "homeless"
    ]
    
    # If message has clear NGO intent, skip FAQ matching
    if (any(indicator in user_message for indicator in ngo_indicators) and 
        any(keyword in user_message for keyword in cause_keywords)):
        return None
    
    # 5. Check for platform-related questions (actual FAQs)
    platform_keywords = [
        "trustworthy", "verified", "trusted", "badge", "tax", "deductible", 
        "platform", "donate", "donation", "receipt", "refund", "payment", 
        "secure", "fee", "minimum", "anonymous", "track", "impact", "volunteer"
    ]
    
    # First, check for exact or nearly exact matches with high threshold
    for faq in faqs:
        # Skip greetings for this phase
        if faq["question"].lower() in ["hello", "hi", "hey", "how are you", "thanks", "thank you"]:
            continue
        
        # Look for strong similarity
        similarity = difflib.SequenceMatcher(None, user_message, faq["question"].lower()).ratio()
        if similarity > 0.75:  # High threshold for nearly exact match
            return faq["answer"]
    
    # Try keyword-based matching if the message contains platform-related terms
    if any(keyword in user_message for keyword in platform_keywords):
        best_match = None
        best_score = 0.6  # Minimum threshold
        
        for faq in faqs:
            faq_text = faq["question"].lower()
            # Skip greetings
            if faq_text in ["hello", "hi", "hey", "how are you", "thanks", "thank you"]:
                continue
                
            # Calculate keyword overlap
            faq_words = set(faq_text.split())
            user_words = set(user_message.split())
            common_words = faq_words.intersection(user_words)
            
            # Require at least one meaningful word match
            if len(common_words) > 0 and any(len(word) > 3 for word in common_words):
                # Calculate similarity score
                similarity = difflib.SequenceMatcher(None, user_message, faq_text).ratio()
                
                # Boost score if question words match
                question_starts = ["how", "what", "when", "why", "can", "is", "are", "do"]
                if any(faq_text.startswith(q) and user_message.startswith(q) for q in question_starts):
                    similarity += 0.1
                    
                if similarity > best_score:
                    best_score = similarity
                    best_match = faq["answer"]
        
        if best_match:
            return best_match
    
    # If we get here, no FAQ match was found
    return None
    
CAUSE_CATEGORIES = {
    "elderly care": {
        "keywords": ["elderly", "senior", "old age", "aged", "retirement", "old people", 
                    "senior citizen", "geriatric", "older adult", "aging", "elder", 
                    "nursing home", "assisted living", "retirement home", "pensioner"],
        "required_terms": ["elderly", "senior", "old", "aged", "aging", "elder"],
        "synonyms": ["elderly care", "senior care", "old age support", "elder assistance", 
                    "geriatric care", "senior citizen support", "elder welfare"]
    },
    "animal welfare": {
        "keywords": ["animal", "pet", "dog", "cat", "stray", "wildlife", "veterinary", "animal welfare", 
                    "animal rescue", "animal shelter", "animal adoption", "animal care", "animal rights",
                    "animal protection", "pet adoption", "pet shelter", "pets", "birds", "zoo", "fauna"],
        "required_terms": ["animal", "pet", "dog", "cat", "stray", "wildlife", "bird", "fauna"],
        "synonyms": ["animal welfare", "pet rescue", "animal protection", "wildlife conservation"]
    },
    "education": {
        "keywords": ["education", "school", "student", "teaching", "learn", "literacy", "classroom", 
                    "teacher", "educational", "study", "academic", "university", "college", "tuition",
                    "learning", "scholarship", "book", "curriculum", "classroom", "pupil", "pedagogy"],
        "required_terms": ["education", "school", "student", "teaching", "learn", "literacy", "academic"],
        "synonyms": ["educational support", "academic assistance", "learning aid", "school support"]
    },
    "health": {
        "keywords": ["health", "medical", "treatment", "hospital", "patient", "doctor", "clinic", 
                    "medicine", "disease", "healthcare", "therapy", "cancer", "mental health",
                    "cure", "healing", "diagnosis", "prescription", "pharmaceutical", "wellness"],
        "required_terms": ["health", "medical", "treatment", "hospital", "healthcare", "disease", "patient"],
        "synonyms": ["healthcare", "medical assistance", "treatment support", "health services"]
    },
    "environment": {
        "keywords": ["environment", "nature", "green", "tree", "plant", "climate", "earth", "forest", 
                    "conservation", "sustainable", "ecology", "pollution", "clean", "recycle",
                    "biodiversity", "ecosystem", "renewable", "waste", "carbon", "environmental"],
        "required_terms": ["environment", "nature", "green", "climate", "earth", "forest", "ecology"],
        "synonyms": ["environmental protection", "nature conservation", "climate action", "ecological support"]
    },
    "women empowerment": {
        "keywords": ["women", "female", "empowerment", "gender", "equality", "feminine", "girl", 
                    "ladies", "mothers", "maternal", "feminism", "sisterhood", "womanhood"],
        "required_terms": ["women", "female", "gender", "girl", "lady", "feminine"],
        "synonyms": ["women's rights", "female empowerment", "gender equality", "women's support"]
    },
    "disaster relief": {
        "keywords": ["disaster", "emergency", "relief", "flood", "earthquake", "cyclone", "tsunami",
                    "hurricane", "calamity", "catastrophe", "crisis", "rescue", "aid", "victim"],
        "required_terms": ["disaster", "emergency", "relief", "flood", "earthquake", "cyclone", "crisis"],
        "synonyms": ["emergency aid", "disaster response", "crisis relief", "calamity support"]
    },
    "hunger relief": {
        "keywords": ["hunger", "food", "nutrition", "meal", "feed", "starvation", "malnutrition",
                    "foodbank", "famine", "nourishment", "sustenance", "ration", "dietary"],
        "required_terms": ["hunger", "food", "nutrition", "meal", "starvation", "famine"],
        "synonyms": ["food security", "hunger alleviation", "nutritional support", "famine relief"]
    },
    "child welfare": {
        "keywords": ["child", "children", "kid", "orphan", "young", "youth", "infant", "toddler",
                    "juvenile", "minor", "adolescent", "teen", "baby", "newborn", "childhood"],
        "required_terms": ["child", "children", "orphan", "kid", "youth", "infant", "toddler"],
        "synonyms": ["child protection", "children's welfare", "youth support", "orphan care"]
    }
}

# Improved NGO categorization with weighted scoring
def categorize_ngo(ngo: Dict[str, Any]) -> str:
    ngo_text = f"{ngo['cause']} {ngo.get('impact', '')}".lower()
    
    best_category = None
    best_score = 0
    
    for category, category_info in CAUSE_CATEGORIES.items():
        score = 0
        
        # Check if primary category name appears in cause (strongest signal)
        if category.lower() in ngo['cause'].lower():
            score += 10
        
        # Check for synonyms
        for synonym in category_info.get("synonyms", []):
            if synonym.lower() in ngo_text:
                score += 8
        
        # Count required term matches
        required_matches = sum(1 for term in category_info["required_terms"] if term in ngo_text)
        score += required_matches * 3
        
        # Count keyword matches
        keyword_matches = sum(1 for keyword in category_info["keywords"] if keyword in ngo_text)
        score += keyword_matches
        
        # Check if this category is the best match so far
        if score > best_score:
            best_score = score
            best_category = category
    
    # Return the best matching category if score is significant
    if best_score >= 5:
        return best_category
    
    # Default to the cause itself if no good category match
    return ngo['cause']

# Cache for categorized NGOs
_categorized_ngos_cache = None

# Get categorized NGOs with caching
def get_categorized_ngos() -> Dict[str, List[Dict[str, Any]]]:
    global _categorized_ngos_cache
    
    if _categorized_ngos_cache is None:
        ngos = load_ngos()
        categorized = {}
        
        for ngo in ngos:
            category = categorize_ngo(ngo)
            if category not in categorized:
                categorized[category] = []
            categorized[category].append(ngo)
        
        _categorized_ngos_cache = categorized
    
    return _categorized_ngos_cache

# Enhanced query category identification with context awareness
def identify_query_category(user_query: str) -> Optional[str]:
    user_query = user_query.lower()
    
    # Check common phrases that indicate intent without explicit category mentions
    intent_phrases = {
        "elderly care": ["help old people", "assist seniors", "support elderly", "care for old", 
                         "help senior citizens", "volunteer with elderly", "support old age"],
        "animal welfare": ["help animals", "save animals", "support pets", "protect wildlife"],
        "education": ["help students", "support education", "teach children", "improve literacy"],
        "health": ["improve healthcare", "medical support", "help patients", "healthcare access"],
        "child welfare": ["help children", "support kids", "assist orphans", "child protection"]
    }
    
    # Check for intent phrases first (highest priority)
    for category, phrases in intent_phrases.items():
        if any(phrase in user_query for phrase in phrases):
            return category
    
    # Calculate scores for each category
    category_scores = {}
    
    for category, category_info in CAUSE_CATEGORIES.items():
        score = 0
        
        # Check if category name is explicitly mentioned (strongest signal)
        if category.lower() in user_query:
            score += 10
        
        # Check for synonyms
        for synonym in category_info.get("synonyms", []):
            if synonym.lower() in user_query:
                score += 8
        
        # Count required term matches
        required_matches = sum(1 for term in category_info["required_terms"] if term in user_query)
        score += required_matches * 3
        
        # Count keyword matches
        keyword_matches = sum(1 for keyword in category_info["keywords"] if keyword in user_query)
        score += keyword_matches
        
        if score > 0:
            category_scores[category] = score
    
    # Find the category with the highest score
    if category_scores:
        best_category = max(category_scores.items(), key=lambda x: x[1])
        if best_category[1] >= 3:  # Minimum threshold to consider a valid match
            return best_category[0]
    
    # If no good category match, try spaCy for semantic similarity
    query_doc = nlp(user_query)
    spacy_scores = {}
    
    for category in CAUSE_CATEGORIES:
        # Check similarity with category name
        category_doc = nlp(category)
        base_score = query_doc.similarity(category_doc)
        
        # Check similarity with synonyms
        synonym_scores = [
            query_doc.similarity(nlp(synonym)) 
            for synonym in CAUSE_CATEGORIES[category].get("synonyms", [])
        ]
        
        # Use highest similarity score
        if synonym_scores:
            max_synonym_score = max(synonym_scores)
            spacy_scores[category] = max(base_score, max_synonym_score)
        else:
            spacy_scores[category] = base_score
    
    # Find best semantic match if any score is above threshold
    if spacy_scores:
        best_match = max(spacy_scores.items(), key=lambda x: x[1])
        if best_match[1] > 0.65:  # Higher threshold for semantic matching
            return best_match[0]
    
    return None

# Enhanced NGO matching with context awareness and relevance ranking
def match_intent_to_ngo(user_query: str, max_results: int = 5) -> List[Dict[str, Any]]:
    # First identify the category with improved detection
    query_category = identify_query_category(user_query)
    
    # Load categorized NGOs
    categorized_ngos = get_categorized_ngos()
    matched_ngos = []
    
    if query_category and query_category in categorized_ngos:
        # Found a direct category match
        candidate_ngos = categorized_ngos[query_category]
        
        # Rank NGOs by relevance to the specific query
        if candidate_ngos:
            query_doc = nlp(user_query.lower())
            scored_ngos = []
            
            for ngo in candidate_ngos:
                # Create a document from NGO details
                ngo_text = f"{ngo['name']} {ngo['cause']} {ngo.get('impact', '')}"
                ngo_doc = nlp(ngo_text.lower())
                
                # Calculate similarity score
                score = query_doc.similarity(ngo_doc)
                scored_ngos.append((ngo, score))
            
            # Sort by relevance score
            scored_ngos.sort(key=lambda x: x[1], reverse=True)
            matched_ngos = [ngo for ngo, _ in scored_ngos[:max_results]]
    
    # If no category match or no NGOs found, try looser matching
    if not matched_ngos:
        # Load all NGOs
        all_ngos = load_ngos()
        
        # Try to match based on semantic similarity
        query_doc = nlp(user_query.lower())
        scored_ngos = []
        
        for ngo in all_ngos:
            # Create a document from NGO details
            ngo_text = f"{ngo['name']} {ngo['cause']} {ngo.get('impact', '')}"
            ngo_doc = nlp(ngo_text.lower())
            
            # Calculate similarity score
            score = query_doc.similarity(ngo_doc)
            
            # Only consider scores above threshold
            if score > 0.6:
                scored_ngos.append((ngo, score))
        
        # Sort by relevance score
        scored_ngos.sort(key=lambda x: x[1], reverse=True)
        matched_ngos = [ngo for ngo, _ in scored_ngos[:max_results]]
    
    return matched_ngos