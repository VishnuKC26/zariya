from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from typing import List, Dict, Any, Optional
from rag.retriever import match_faqs, match_intent_to_ngo, identify_query_category, CAUSE_CATEGORIES

# Initialize FastAPI app
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatInput(BaseModel):
    message: str

@app.post("/chat-stream/")
async def chat_stream(user_input: ChatInput):
    msg = user_input.message.strip()

    # Try matching FAQ first
    faq_response = match_faqs(msg)
    if faq_response:
        return StreamingResponse(iter([faq_response]), media_type="text/plain")

    # Identify the query category with enhanced precision
    query_category = identify_query_category(msg)
    
    # Get matching NGOs with improved relevance
    matched_ngos = match_intent_to_ngo(msg, max_results=5)

    if matched_ngos:
        # Format personalized introduction based on the identified category and query
        intro = generate_personalized_intro(msg, query_category, matched_ngos)

        # Format the list of NGOs with enhanced presentation
        ngo_response = f"{intro}\n\n"
        
        for i, ngo in enumerate(matched_ngos, 1):
            # Highlight category match if applicable
            category_match = ""
            if query_category and query_category.lower() in ngo['cause'].lower():
                category_match = f" (Specializes in {query_category})"
            
            ngo_response += f"{i}. {ngo['name']}{category_match}\n"
            ngo_response += f"*Impact*: {ngo.get('impact', 'No impact description available')}\n"
            ngo_response += f"*Location*: {ngo['location']}\n"
            ngo_response += f"*Trust Rating*: {ngo.get('trust_rating', 'No rating available')}\n"
            ngo_response += f"*Website*: {ngo['website']}\n\n"
        
        # Add contextual closing message
        ngo_response += generate_closing_message(msg, query_category, len(matched_ngos))
            
        return StreamingResponse(iter([ngo_response]), media_type="text/plain")
    
    # Enhanced fallback responses based on what we understood from the query
    if query_category:
        # We identified a category but couldn't find matching NGOs
        fallback = generate_category_fallback(query_category)
        return StreamingResponse(iter([fallback]), media_type="text/plain")
    else:
        # We couldn't identify what the user is looking for
        return StreamingResponse(iter([
            "I'm not sure which cause you're interested in supporting. Could you please provide more details about the type of organization you're looking for? For example: elderly care, education, animal welfare, etc."
        ]), media_type="text/plain")

# Generate personalized introduction based on query and category
def generate_personalized_intro(query: str, category: Optional[str], ngos: List[Dict[str, Any]]) -> str:
    # Check if query contains specific intent phrases
    query = query.lower()
    
    # Donation intent
    if any(word in query for word in ["donate", "donation", "contribute", "give money"]):
        if category:
            return f"Here are trusted organizations accepting donations for {category}:"
        else:
            return "Here are trusted organizations accepting donations that match your interests:"
    
    # Volunteer intent
    if any(word in query for word in ["volunteer", "help out", "work with", "assist"]):
        if category:
            return f"Here are organizations where you can volunteer to support {category}:"
        else:
            return "Here are organizations where you can volunteer:"
    
    # Default category-specific introductions with more personalization
    if category:
        if category == "elderly care":
            return "Here are reputable organizations supporting senior citizens:"
        elif category == "animal welfare":
            return "Here are trusted animal welfare organizations that need support:"
        elif category == "education":
            return "Here are educational organizations making an impact:"
        elif category == "health":
            return "Here are healthcare organizations providing critical services:"
        elif category == "environment":
            return "Here are environmental organizations working on conservation:"
        elif category == "women empowerment":
            return "Here are organizations empowering women and girls:"
        elif category == "disaster relief":
            return "Here are disaster relief organizations providing emergency aid:"
        elif category == "hunger relief":
            return "Here are organizations fighting hunger and food insecurity:"
        elif category == "child welfare":
            return "Here are organizations supporting children's wellbeing:"
        else:
            return f"Here are organizations focused on {category}:"
    
    # Generic introduction
    return "Here are some organizations that match your interests:"

# Generate contextual closing message
def generate_closing_message(query: str, category: Optional[str], ngo_count: int) -> str:
    query = query.lower()
    
    # Donation intent
    if any(word in query for word in ["donate", "donation", "contribute", "give money"]):
        if ngo_count > 1:
            return "All these organizations accept donations through their websites. Would you like specific information about donation processes for any of them?"
        else:
            return "You can donate directly through their website. Would you like more information about their donation process?"
    
    # Volunteer intent
    if any(word in query for word in ["volunteer", "help out", "work with", "assist"]):
        if ngo_count > 1:
            return "These organizations welcome volunteers. Would you like details about volunteer opportunities with any of them?"
        else:
            return "This organization welcomes volunteers. Would you like details about their volunteer opportunities?"
    
    # Default closing
    if ngo_count > 1:
        return "Would you like to learn more about any of these organizations or how you can support their work?"
    else:
        return "Would you like to learn more about this organization or how you can support their work?"

# Generate fallback message for identified category with no NGO matches
def generate_category_fallback(category: str) -> str:
    fallbacks = {
        "elderly care": "I couldn't find verified elderly care organizations in our database. Would you like to see organizations working with healthcare or social services that might also help seniors?",
        "animal welfare": "I couldn't find verified animal welfare organizations in our database. Would you like to see organizations working with wildlife conservation or environmental protection instead?",
        "education": "I couldn't find verified educational organizations in our database. Would you like to see organizations working with children or community development that might include educational programs?",
        "health": "I couldn't find verified healthcare organizations in our database. Would you like to see organizations working with community welfare or disaster relief that might include health services?",
        "environment": "I couldn't find verified environmental organizations in our database. Would you like to see organizations working with sustainability or wildlife conservation instead?",
        "women empowerment": "I couldn't find verified women's empowerment organizations in our database. Would you like to see organizations working with human rights or education that might support women's causes?",
        "disaster relief": "I couldn't find verified disaster relief organizations in our database. Would you like to see organizations working with humanitarian aid or emergency services instead?",
        "hunger relief": "I couldn't find verified hunger relief organizations in our database. Would you like to see organizations working with poverty alleviation or community development instead?",
        "child welfare": "I couldn't find verified child welfare organizations in our database. Would you like to see organizations working with education or family support services instead?"
    }
    
    return fallbacks.get(
        category, 
        f"I couldn't find verified organizations specifically working on {category}. Would you like me to suggest organizations in related areas instead?"
    )