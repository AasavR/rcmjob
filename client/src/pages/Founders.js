import React from 'react';

const Founders = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Meet Our Founders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Aasav Ravi</h2>
          <p className="text-lg mb-4">Co-Founder & CEO</p>
          <p>Aasav Ravi is a visionary entrepreneur with a passion for revolutionizing the job market through innovative technology. With years of experience in tech and recruitment, Aasav leads RCM Job towards creating meaningful connections between talent and opportunities.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Rohit Kaushik</h2>
          <p className="text-lg mb-4">Co-Founder & CTO</p>
          <p>Rohit Kaushik brings technical expertise and innovative thinking to RCM Job. As a seasoned developer and strategist, Rohit ensures our platform leverages cutting-edge AI and machine learning to provide unparalleled matching and insights.</p>
        </div>
      </div>
    </div>
  );
};

export default Founders;
