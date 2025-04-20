import React from 'react';
import { useParams } from 'react-router';
import NGODetail from './NGODetail';

import image10 from '../assets/image10.jpeg';
import image11 from '../assets/image11.jpeg';
import image12 from '../assets/image12.jpeg';
import image13 from '../assets/image13.jpeg';
import image14 from '../assets/image14.jpeg';
import image15 from '../assets/image15.jpeg';
import image16 from '../assets/image16.jpeg';
import image17 from '../assets/image17.jpeg';
import image18 from '../assets/image18.jpg';
import image19 from '../assets/image19.jpeg';

const ngoData = [
  {
    id: 1,
    name: 'Narayan Seva Sansthan',
    location: 'Udaipur',
    cause: 'Child Welfare',
    description:
      'Narayan Seva Sansthan is a charitable organization committed to helping differently-abled individuals and children in need.',
    image: image16,
    trustVerified: true,
    totalDonations: 212,
    email: '',
    phone: '',
    website: '',
  },
  {
    id: 2,
    name: 'Chintan NGO',
    location: 'Udaipur',
    cause: 'Child Welfare',
    description: 'Chintan works at the intersection of environment and social justice by managing waste sustainably. They promote recycling, reduce consumption, and uplift waste pickers by integrating them into formal waste management systems, ensuring dignity and livelihoods.',
    image: image12,
    trustVerified: true,
    totalDonations: 340,
    email: '',
    phone: '',
    website: '',
  },
  {
    id: 3,
    name: 'Dog home foundation',
      location: 'jodhpur',
      cause: 'Dog care',
      description: 'Dog Home Foundation rescues and shelters stray and injured dogs, providing food, medical care, and love. Their mission is to create a compassionate environment for animals, promoting adoption and public awareness about animal rights.',
      image: image14,
    trustVerified: true,
    totalDonations: 412,
    email: '',
    phone: '',
    website: '',
  },
  {
    id: 4,
    name: 'Education First',
      location: 'Chennai',
      cause: 'Education',
      description: 'Education First is dedicated to closing the education gap by supporting children from low-income communities. They provide scholarships, learning materials, and holistic development programs to ensure every child receives a quality education.',
     image: image18,
    trustVerified: true,
    totalDonations: 525,
    email: '',
    phone: '',
    website: '',
  },
  {
    id: 5,
    name: 'Health4All',
      location: 'Kolkata',
      cause: 'Healthcare',
      description: 'Health4All delivers essential healthcare services to underserved areas. Through mobile clinics, health camps, and awareness drives, they improve access to medical care for vulnerable populations, focusing on preventive and primary healthcare.',
      image: image13,
    trustVerified: true,
    totalDonations: 390,
    email: '',
    phone: '',
    website: '',
  },
  {
    id: 6,
    name: 'Food Relief',
      location: 'Pune',
      cause: 'Hunger',
      description: 'Food Relief aims to eliminate hunger by distributing nutritious meals to the homeless, children, and low-income families. They partner with local communities and restaurants to rescue surplus food and reduce food waste.',
      image: image15,
    trustVerified: true,
    totalDonations: 430,
    email: '',
    phone: '',
    website: '',
  },
  {
    id: 7,
    name: 'Women Rise',
      location: 'Jaipur',
      cause: 'Women Empowerment',
      description: 'Women Rise empowers women through skill training, education, legal awareness, and entrepreneurship support. Their goal is to build confident, financially independent women who become leaders in their communities.',
      image: image19,
    trustVerified: true,
    totalDonations: 278,
    email: '',
    phone: '',
    website: '',
  },
  {
    id: 8,
    name: 'Clean Future',
    location: 'Lucknow',
    cause: 'Sanitation',
    description: 'Clean Future advocates for better hygiene and sanitation practices in rural and urban slums. They build toilets, promote menstrual hygiene awareness, and lead community-driven cleanliness initiatives to improve public health.',
    image: image17,
    trustVerified: true,
    totalDonations: 315,
    email: 'bluecross@gmail.com',
    phone: '+91 8899776655',
    website: 'https://bluecrossofindia.org',
  },
  {
    id: 9,
    name: 'TechBridge',
    location: 'Hyderabad',
    cause: 'Tech Education',
    description: 'TechBridge introduces underprivileged youth to technology through coding bootcamps, robotics, and digital literacy programs. They aim to bridge the digital divide and open up career opportunities in tech for all.',
    image: image10,
    trustVerified: true,
    totalDonations: 600,
    email: 'donate@akshayapatra.org',
    phone: '+91 8112233445',
    website: 'https://www.akshayapatra.org',
  },
  {
    id: 10,
    name: 'Support Elders',
    location: 'Ahmedabad',
    cause: 'Senior Citizens',
    description: 'Support Elders enhances the lives of senior citizens through healthcare access, companionship services, and community engagement. They work to ensure dignity, safety, and happiness in the golden years of life.',
    image: image11,
    trustVerified: true,
    totalDonations: 498,
    email: 'join@robinhoodarmy.com',
    phone: '+91 7889900112',
    website: 'https://robinhoodarmy.com',
  },
];

const NGODetailPage = () => {
  const { id } = useParams();
  const ngo = ngoData.find((n) => n.id.toString() === id); // find the matching NGO

  if (!ngo) {
    return (
      <div className="text-center text-red-600 text-xl mt-10">
        NGO not found 😕
      </div>
    );
  }

  return <NGODetail ngo={ngo} />;
};

export default NGODetailPage;