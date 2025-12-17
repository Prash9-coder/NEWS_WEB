// Complete news database with FULL article content, images, and videos
export const categories = ['Home', 'India', 'World', 'Business', 'Technology', 'Sports', 'Entertainment', 'Lifestyle'];

export const allArticles = [
    {
        id: 1,
        title: "Parliament Passes Historic Education Reform Bill with Unanimous Support",
        slug: "parliament-passes-historic-education-reform-bill",
        excerpt: "Major changes in education policy aim to revolutionize learning across the country with focus on skill development and digital literacy.",

        images: [
            {
                url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=600&fit=crop",
                caption: "Parliament in session during the historic education reform bill voting",
                credit: "PTI"
            },
            {
                url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop",
                caption: "Education Minister addressing the media after bill passage",
                credit: "ANI"
            },
            {
                url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=600&fit=crop",
                caption: "Students celebrating the education reform bill",
                credit: "Reuters"
            },
            {
                url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
                caption: "Teachers welcoming the new education policy changes",
                credit: "AP"
            },
            {
                url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=600&fit=crop",
                caption: "Modern classroom setup under new education framework",
                credit: "Getty Images"
            },
            {
                url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&h=600&fit=crop",
                caption: "Digital learning initiatives introduced in schools",
                credit: "AFP"
            }
        ],

        videos: [
            {
                url: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
                title: "Education Minister's Full Speech on Education Reform Bill",
                caption: "Watch Education Minister Dr. Ramesh Kumar's complete address explaining the key features of the historic education reform bill"
            },
            {
                url: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
                title: "Expert Panel Discussion on Education Reforms",
                caption: "Leading educationists discuss the impact and implementation of the new education policy"
            }
        ],

        content: `
      <p>The Indian Parliament today passed the landmark Education Reform Bill 2024 with unanimous support from all parties. This historic legislation aims to transform the country's education system with a focus on skill development, digital literacy, and inclusive learning.</p>

      <p>The bill, which was tabled in the Lok Sabha last month, received widespread support from both the ruling party and the opposition. Education Minister Dr. Ramesh Kumar stated, "This is a revolutionary step that will prepare our youth for the challenges of the 21st century. We are committed to making India a global knowledge superpower."</p>

      {{IMAGE_0}}

      <h3>Key Highlights of the Bill</h3>
      <p>The Education Reform Bill 2024 introduces several groundbreaking changes to the existing education framework. One of the most significant provisions is the integration of vocational training starting from class 6. This will enable students to gain practical skills alongside theoretical knowledge, making them more employable upon graduation.</p>

      <p>Another major change is the mandatory inclusion of coding and artificial intelligence literacy from class 8. In today's digital age, these skills are essential, and the government aims to ensure that every student in India has access to quality technology education.</p>

      {{VIDEO_0}}

      <p>The bill also introduces a flexible credit system for higher education, allowing students to pursue interdisciplinary courses and take breaks during their studies without losing credits. This system is modeled after successful frameworks in countries like the United States and several European nations.</p>

      {{IMAGE_1}}

      <h3>Budget Allocation and Implementation</h3>
      <p>The government has committed to a 50% increase in the education budget allocation to support the implementation of these reforms. This additional funding will be used to upgrade infrastructure, train teachers, and develop new curriculum materials.</p>

      {{GALLERY}}

      <p>Special provisions have been made for rural and tribal areas, with dedicated funds allocated for building schools, providing digital infrastructure, and recruiting qualified teachers. The government aims to bridge the urban-rural divide in education quality within the next five years.</p>

      <p>The implementation will be carried out in phases, starting from the next academic year. Urban areas and well-equipped schools will be the first to adopt the new curriculum, followed by gradual rollout to rural regions.</p>

      <h3>Reactions from Stakeholders</h3>
      <p>The education reform has been welcomed by various stakeholders, including teachers' unions, student organizations, and industry leaders. Dr. Anjali Verma, President of the National Teachers' Federation, said, "This is a long-awaited change. The new system will empower teachers to focus on holistic development rather than rote learning."</p>

      {{IMAGE_2}}

      <p>Industry leaders have also expressed optimism about the reforms. Sundar Iyer, CEO of a leading IT company, commented, "These reforms align with industry needs. Students will now graduate with practical skills that make them job-ready from day one."</p>

      {{VIDEO_1}}

      <p>However, some experts have raised concerns about the implementation challenges, particularly in resource-constrained areas. They emphasize the need for adequate teacher training and continuous monitoring to ensure the reforms achieve their intended objectives.</p>

      <h3>International Perspective</h3>
      <p>Education experts from around the world have praised India's bold move. UNESCO's Regional Director stated, "India is setting an example for developing nations. These reforms demonstrate a commitment to preparing the next generation for a rapidly changing world."</p>

      <p>The bill also includes provisions for international collaborations, allowing Indian institutions to partner with foreign universities for exchange programs, joint research, and curriculum development.</p>

      <h3>Looking Ahead</h3>
      <p>As the nation prepares for this transformative change, the government has assured all stakeholders of its commitment to successful implementation. Regular reviews will be conducted to assess progress and make necessary adjustments.</p>

      <p>State governments have welcomed the initiative and pledged full cooperation. Several states have already begun preparatory work, including teacher training programs and infrastructure upgrades.</p>

      <p>The Education Reform Bill 2024 marks a new chapter in India's journey toward becoming a knowledge economy. With proper implementation and stakeholder support, these reforms have the potential to revolutionize the lives of millions of students across the country.</p>
    `,

        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=600&fit=crop",
        category: "India",
        author: {
            name: "Rajesh Kumar",
            avatar: "https://i.pravatar.cc/150?img=12",
            bio: "Senior Political Correspondent with over 15 years of experience covering Indian politics and policy matters."
        },
        date: "2024-12-16",
        time: "1 hour ago",
        readTime: "8 min read",
        views: "125K",
        trending: true,
        tags: ["Politics", "Education", "Policy", "Government", "Reform"]
    },
    {
        id: 2,
        title: "Indian AI Startup Launches Revolutionary Healthcare Diagnostic Platform",
        slug: "indian-ai-startup-healthcare-diagnostic-platform",
        excerpt: "New AI-powered platform promises 95% accuracy in early disease detection using machine learning and computer vision.",

        images: [
            {
                url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=600&fit=crop",
                caption: "MediAI's state-of-the-art AI diagnostic platform in action",
                credit: "MediAI"
            },
            {
                url: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&h=600&fit=crop",
                caption: "Medical professionals using AI-powered diagnostic tools",
                credit: "Reuters"
            },
            {
                url: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1200&h=600&fit=crop",
                caption: "AI analyzing medical scans for early disease detection",
                credit: "Getty Images"
            },
            {
                url: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=600&fit=crop",
                caption: "Hospital integration of MediAI platform",
                credit: "AFP"
            },
            {
                url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&h=600&fit=crop",
                caption: "Doctors reviewing AI-generated diagnosis reports",
                credit: "PTI"
            },
            {
                url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=600&fit=crop",
                caption: "MediAI founders Dr. Priya Sharma and Arjun Menon at launch event",
                credit: "ANI"
            }
        ],

        videos: [
            {
                url: "https://www.youtube.com/watch?v=aircAruvnKk",
                title: "MediAI Platform Demo: How AI Detects Diseases",
                caption: "Watch a detailed demonstration of how MediAI's artificial intelligence platform analyzes medical data and provides accurate diagnoses"
            },
            {
                url: "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
                title: "Exclusive Interview with MediAI Founders",
                caption: "Dr. Priya Sharma and Arjun Menon discuss their journey and vision for AI-powered healthcare in India"
            }
        ],

        content: `
      <p>Bangalore-based startup MediAI has launched a groundbreaking artificial intelligence platform that can detect over 50 diseases with 95% accuracy. The platform uses advanced machine learning algorithms and computer vision technology to analyze medical data and provide rapid, accurate diagnoses.</p>

      {{IMAGE_0}}

      <p>Founded in 2020 by Dr. Priya Sharma and tech entrepreneur Arjun Menon, MediAI has been in stealth mode for the past two years, conducting extensive clinical trials and refining its technology. Today's launch marks a significant milestone in the company's mission to democratize healthcare using AI.</p>

      <h3>Revolutionary Technology</h3>
      <p>The MediAI platform leverages deep learning neural networks trained on millions of medical images and patient records. It can analyze X-rays, CT scans, MRI images, and even blood test results to identify potential health issues that might be missed by human eyes.</p>

      {{VIDEO_0}}

      <p>What sets MediAI apart from other diagnostic tools is its ability to detect diseases at very early stages. For instance, the platform can identify certain cancers up to six months earlier than traditional diagnostic methods, potentially saving countless lives through early intervention.</p>

      {{IMAGE_1}}

      <p>The system also provides personalized treatment recommendations based on the patient's medical history, genetic factors, and current health condition. This personalized approach ensures that each patient receives the most effective treatment plan.</p>

      <h3>Clinical Validation</h3>
      <p>Before launch, MediAI underwent rigorous clinical trials at 50 hospitals across India. The results were remarkable – the platform achieved 95% accuracy in detecting major diseases including various types of cancer, heart disease, diabetes, and neurological disorders.</p>

      {{GALLERY}}

      <p>Dr. Ramesh Patel, Chief of Cardiology at Mumbai's leading hospital, who participated in the trials, said, "MediAI's accuracy is comparable to expert radiologists and cardiologists. In some cases, it even outperformed human diagnosis, especially in detecting subtle abnormalities."</p>

      <h3>Hospital Partnerships</h3>
      <p>The company has already partnered with 500+ hospitals across India and plans to expand internationally. Major hospital chains including Apollo, Fortis, and Max Healthcare have signed agreements to integrate MediAI into their diagnostic workflows.</p>

      {{IMAGE_2}}

      <p>The platform is designed to assist doctors, not replace them. It serves as a powerful tool that provides a second opinion and highlights potential issues that require further investigation.</p>

      {{VIDEO_1}}

      <h3>Affordable Healthcare</h3>
      <p>One of MediAI's core missions is to make advanced diagnostics accessible to everyone, including people in rural areas. The company has developed a pricing model that makes the platform affordable for patients across all economic segments.</p>

      <p>For rural areas with limited access to specialists, MediAI is developing a mobile app that allows local healthcare workers to upload patient data and receive expert-level diagnostic insights instantly. This could revolutionize healthcare delivery in remote regions.</p>

      <h3>Funding and Growth</h3>
      <p>MediAI has received $50 million in Series B funding led by prominent venture capital firms. The company is currently valued at $300 million and plans to use the funding for international expansion, research and development, and hiring top talent.</p>

      <h3>Future Roadmap</h3>
      <p>Looking ahead, MediAI plans to expand its capabilities to cover more diseases and integrate with electronic health records systems. The company is also developing predictive models that can assess a person's risk of developing certain diseases based on lifestyle, genetics, and environmental factors.</p>

      <p>This launch represents a significant step forward in the application of AI in healthcare, and health experts are calling it a game-changer for preventive medicine and early disease detection.</p>
    `,

        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
        category: "Technology",
        author: {
            name: "Sneha Reddy",
            avatar: "https://i.pravatar.cc/150?img=10",
            bio: "Technology Reporter specializing in AI, Machine Learning, and Healthcare Innovation."
        },
        date: "2024-12-16",
        time: "2 hours ago",
        readTime: "7 min read",
        views: "143K",
        trending: true,
        tags: ["AI", "Healthcare", "Startup", "Innovation", "Technology"]
    },
    {
        id: 3,
        title: "India Defeats Australia in Cricket World Cup Final: Historic Victory",
        slug: "india-defeats-australia-world-cup-final",
        excerpt: "Sensational performance by Indian cricket team brings home the World Cup trophy after thrilling final match.",

        images: [
            {
                url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=600&fit=crop",
                caption: "Indian cricket team celebrates World Cup victory",
                credit: "BCCI"
            },
            {
                url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=600&fit=crop",
                caption: "Virat Kohli hits the winning shot",
                credit: "ICC"
            },
            {
                url: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1200&h=600&fit=crop",
                caption: "Packed Narendra Modi Stadium during the final",
                credit: "Reuters"
            },
            {
                url: "https://images.unsplash.com/photo-1593766788306-28561086694e?w=1200&h=600&fit=crop",
                caption: "Captain Rohit Sharma lifts the World Cup trophy",
                credit: "AFP"
            },
            {
                url: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1200&h=600&fit=crop",
                caption: "Jasprit Bumrah celebrates taking crucial wicket",
                credit: "Getty Images"
            },
            {
                url: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=1200&h=600&fit=crop",
                caption: "Fans celebrating across India",
                credit: "PTI"
            }
        ],

        videos: [
            {
                url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
                title: "Match Highlights: India vs Australia World Cup Final",
                caption: "Watch the complete highlights of the thrilling World Cup final between India and Australia"
            },
            {
                url: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
                title: "Virat Kohli's Masterclass Century - Full Innings",
                caption: "Relive Virat Kohli's match-winning century that guided India to World Cup glory"
            }
        ],

        content: `
      <p>India clinched the Cricket World Cup 2024 title with a stunning 6-wicket victory over Australia in front of a packed Narendra Modi Stadium in Ahmedabad. The historic win sparked nationwide celebrations as millions of fans took to the streets.</p>

      {{IMAGE_0}}

      <p>The final, watched by over 1.3 lakh spectators at the stadium and billions worldwide, lived up to its billing as one of the greatest cricket matches ever played. India's victory marks their third World Cup title and first since 2011.</p>

      <h3>Match Summary</h3>
      <p>Australia won the toss and elected to bat first on a pitch that offered something for both batsmen and bowlers. They posted a competitive total of 287/10 in 49.3 overs, with Steve Smith scoring a brilliant 89 and Travis Head contributing a quick-fire 62.</p>

      {{VIDEO_0}}

      <p>India's bowling attack was led by Jasprit Bumrah, who claimed 4 wickets for 45 runs and was later named Player of the Series. Mohammed Shami and Kuldeep Yadav chipped in with 3 and 2 wickets respectively.</p>

      {{IMAGE_1}}

      <h3>India's Chase</h3>
      <p>Chasing 288, India got off to a shaky start, losing both openers within the first 10 overs. However, Virat Kohli steadied the innings with a masterclass century, scoring 115 runs off 98 balls. His innings included 12 boundaries and 2 sixes.</p>

      {{GALLERY}}

      <p>KL Rahul provided excellent support with a patient 67, and the duo added 150 runs for the third wicket. When Kohli fell in the 42nd over, India still needed 63 runs from 51 balls.</p>

      {{IMAGE_2}}

      <p>Hardik Pandya then played a blistering cameo, scoring 34 off just 18 balls to take India to the brink of victory. Ravindra Jadeja hit the winning runs with a six over long-on, triggering wild celebrations.</p>

      {{VIDEO_1}}

      <h3>Captain's Leadership</h3>
      <p>Captain Rohit Sharma, who scored 45 in the final, was emotional during the presentation ceremony. "This is for every Indian who believes in us. The team showed incredible character and determination throughout the tournament," he said.</p>

      <p>This was Rohit's final World Cup match, and what better way to sign off than lifting the trophy. His leadership throughout the tournament was exceptional, and he finished as the tournament's second-highest run-scorer.</p>

      <h3>National Celebrations</h3>
      <p>As the winning runs were hit, celebrations erupted across India. From the streets of Mumbai to the markets of Delhi, from the beaches of Goa to the valleys of Kashmir, Indians celebrated their team's triumph.</p>

      <p>Fireworks lit up the sky, people danced in the streets, and social media was flooded with messages of congratulations. Celebrities, politicians, and sports personalities from around the world congratulated Team India.</p>

      <h3>Government Recognition</h3>
      <p>Prime Minister congratulated the team and announced cash rewards and national honors for the victorious squad. Each player will receive ₹5 crore, while the support staff will also be rewarded for their contributions.</p>

      <p>Several state governments announced additional rewards, and commercial endorsements are expected to flood in for the players.</p>
    `,

        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=600&fit=crop",
        category: "Sports",
        author: {
            name: "Vikram Singh",
            avatar: "https://i.pravatar.cc/150?img=30",
            bio: "Sports Editor and Cricket Expert with 20+ years of experience covering international cricket."
        },
        date: "2024-12-16",
        time: "3 hours ago",
        readTime: "6 min read",
        views: "567K",
        trending: true,
        tags: ["Cricket", "World Cup", "India", "Australia", "Sports"]
    },
    {
        id: 4,
        title: "Climate Summit 2024 Reaches Breakthrough Agreement on Carbon Emissions",
        slug: "climate-summit-2024-breakthrough-agreement",
        excerpt: "World leaders agree on historic climate deal with binding commitments to achieve net-zero emissions by 2050.",

        images: [
            {
                url: "https://images.unsplash.com/photo-1569163139394-de4798aa62b2?w=1200&h=600&fit=crop",
                caption: "World leaders sign historic climate agreement at COP29",
                credit: "UN Climate"
            },
            {
                url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop",
                caption: "Wind farms represent the future of clean energy",
                credit: "Reuters"
            },
            {
                url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=600&fit=crop",
                caption: "Solar panel installations growing worldwide",
                credit: "AFP"
            },
            {
                url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=600&fit=crop",
                caption: "Protected forests under new conservation agreement",
                credit: "Getty Images"
            },
            {
                url: "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1200&h=600&fit=crop",
                caption: "Electric vehicles key to reducing emissions",
                credit: "PTI"
            },
            {
                url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=600&fit=crop",
                caption: "Climate activists celebrate the agreement",
                credit: "AP"
            }
        ],

        videos: [
            {
                url: "https://www.youtube.com/watch?v=d0tGBCCE0lc",
                title: "COP29 Climate Summit: Complete Coverage",
                caption: "Watch the complete proceedings of the historic COP29 Climate Summit including speeches from world leaders"
            },
            {
                url: "https://www.youtube.com/watch?v=wbR-5mHI6bo",
                title: "Expert Analysis: Impact of New Climate Agreement",
                caption: "Climate scientists and policy experts discuss what the new agreement means for the planet"
            }
        ],

        content: `
      <p>The COP29 Climate Summit concluded today with a groundbreaking agreement signed by 195 nations. The historic deal includes legally binding commitments to reduce carbon emissions and transition to renewable energy sources.</p>

      {{IMAGE_0}}

      <p>After two weeks of intense negotiations in Dubai, world leaders reached consensus on what many are calling the most significant climate agreement since the Paris Accord of 2015.</p>

      <h3>Key Provisions</h3>
      <p>The agreement commits all signatory nations to achieve net-zero carbon emissions by 2050. Developed nations have agreed to reach this target by 2045, while developing countries have until 2055.</p>

      {{VIDEO_0}}

      <p>A landmark $500 billion climate fund has been established to help developing nations transition to clean energy. This fund will be contributed by developed countries over the next 10 years and will be used for renewable energy infrastructure, technology transfer, and climate adaptation measures.</p>

      {{IMAGE_1}}

      <p>The agreement also mandates the phase-out of coal-based power generation by 2035. Countries with heavy coal dependence will receive financial and technical support to transition to cleaner alternatives.</p>

      <h3>Environmental Protections</h3>
      <p>One of the most celebrated aspects of the agreement is the commitment to protect 30% of Earth's land and ocean areas by 2030. This includes establishing new protected areas, strengthening existing conservation efforts, and restoring degraded ecosystems.</p>

      {{GALLERY}}

      <p>The deal also includes strict regulations on deforestation, with financial penalties for countries that fail to meet their forest conservation targets.</p>

      {{IMAGE_2}}

      <h3>Monitoring and Enforcement</h3>
      <p>Unlike previous climate agreements, this one includes robust monitoring and enforcement mechanisms. An independent international body will conduct annual reviews of each country's progress.</p>

      {{VIDEO_1}}

      <p>Countries that fail to meet their commitments will face graduated penalties, including trade restrictions and withdrawal of climate finance. This enforcement mechanism was a key demand from environmental activists and smaller island nations most affected by climate change.</p>

      <h3>Industry Response</h3>
      <p>Major corporations have largely welcomed the agreement. Many business leaders believe that clear, long-term climate targets will provide the certainty needed for investment in clean technologies.</p>

      <p>However, some industries, particularly those dependent on fossil fuels, have expressed concerns about the transition timeline. The agreement includes provisions for a "just transition," ensuring that workers in affected industries receive support for retraining and employment in green sectors.</p>

      <h3>Looking Forward</h3>
      <p>The success of this agreement will depend on implementation. The first review of progress will take place in 2026, with countries expected to submit detailed action plans by mid-2025.</p>

      <p>Environmental experts are optimistic but stress the need for urgent action. "We have the agreement, now we need action," said Dr. Maria Santos, lead climate scientist at the UN Environment Programme.</p>
    `,

        image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b2?w=1200&h=600&fit=crop",
        category: "World",
        author: {
            name: "Sarah Johnson",
            avatar: "https://i.pravatar.cc/150?img=20",
            bio: "Environment Correspondent covering global climate change and sustainability issues."
        },
        date: "2024-12-16",
        time: "4 hours ago",
        readTime: "7 min read",
        views: "234K",
        trending: true,
        tags: ["Climate", "Environment", "Global", "Summit", "Sustainability"]
    },
    {
        id: 5,
        title: "Indian Stock Markets Hit All-Time High: Sensex Crosses 75,000 Mark",
        slug: "sensex-crosses-75000-all-time-high",
        excerpt: "Record-breaking rally driven by strong corporate earnings and robust economic indicators fuels investor optimism.",

        images: [
            {
                url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
                caption: "BSE Sensex crosses historic 75,000 mark",
                credit: "BSE"
            },
            {
                url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=600&fit=crop",
                caption: "Traders celebrate at Bombay Stock Exchange",
                credit: "Reuters"
            },
            {
                url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
                caption: "Stock market data showing record gains",
                credit: "AFP"
            },
            {
                url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=600&fit=crop",
                caption: "Investors analyzing market trends",
                credit: "Getty Images"
            },
            {
                url: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&h=600&fit=crop",
                caption: "Banking sector leads the market rally",
                credit: "PTI"
            },
            {
                url: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=600&fit=crop",
                caption: "Economic growth fuels market optimism",
                credit: "ANI"
            }
        ],

        videos: [
            {
                url: "https://www.youtube.com/watch?v=lNzAz5lmJgE",
                title: "Market Analysis: Sensex at 75,000 - What's Driving the Rally?",
                caption: "Expert analysts break down the factors behind the historic stock market rally"
            },
            {
                url: "https://www.youtube.com/watch?v=ZZ5LpwO-An4",
                title: "Investment Strategy: How to Navigate Record High Markets",
                caption: "Financial advisors share tips for investors in the current market conditions"
            }
        ],

        content: `
      <p>Indian stock markets witnessed a historic day as the BSE Sensex crossed the 75,000 mark for the first time, while NSE Nifty surged past 22,500. The rally was driven by strong corporate earnings, positive economic indicators, and sustained foreign institutional investment.</p>

      {{IMAGE_0}}

      <p>The benchmark indices closed at record highs, with Sensex at 75,124 (up 2.3%) and Nifty at 22,567 (up 2.1%). The total market capitalization reached ₹365 lakh crore, solidifying India's position as the fifth-largest equity market globally.</p>

      <h3>Sectoral Performance</h3>
      <p>Banking stocks led the rally, with the Bank Nifty index surging 3.2%. HDFC Bank, ICICI Bank, and State Bank of India were among the top gainers. The strong performance was attributed to healthy quarterly results and improving asset quality.</p>

      {{VIDEO_0}}

      <p>IT stocks also showed robust gains, with TCS, Infosys, and Wipro rising sharply on the back of strong order books and optimistic guidance for the upcoming quarters. The IT sector has benefited from increased digital transformation spending globally.</p>

      {{IMAGE_1}}

      <p>Automobile stocks rallied on strong monthly sales data and positive outlook for the festive season. Maruti Suzuki, Tata Motors, and Mahindra & Mahindra were major contributors to the index gains.</p>

      <h3>Foreign Investment Surge</h3>
      <p>Foreign institutional investors (FIIs) have pumped in ₹12,500 crore this week alone, marking the highest weekly inflow in six months. This surge in foreign investment reflects growing confidence in India's economic prospects.</p>

      {{GALLERY}}

      <p>Global funds are increasingly viewing India as a preferred investment destination due to stable economic growth, improving corporate governance, and robust regulatory framework.</p>

      {{IMAGE_2}}

      <h3>Economic Fundamentals</h3>
      <p>The rally is backed by strong economic fundamentals. India's GDP growth for Q2 came in at 7.8%, surpassing expectations and maintaining the country's position as the fastest-growing major economy.</p>

      {{VIDEO_1}}

      <p>Inflation has remained within the RBI's comfort zone, and industrial production has shown consistent improvement. Manufacturing PMI has been in expansion territory for 15 consecutive months.</p>

      <h3>Retail Participation</h3>
      <p>Retail investor participation has reached unprecedented levels, with over 2.5 crore new demat accounts opened in the past year. The democratization of investing through digital platforms has enabled millions of Indians to participate in wealth creation.</p>

      <p>SIP (Systematic Investment Plan) contributions have crossed ₹15,000 crore per month, indicating strong retail confidence in equity markets.</p>

      <h3>Risk Factors</h3>
      <p>Despite the optimism, experts point to potential risks including global economic uncertainties, geopolitical tensions, and the possibility of interest rate changes. Crude oil prices and currency fluctuations also remain key variables to watch.</p>

      <p>Market participants are advised to maintain a diversified portfolio and adopt a long-term investment approach rather than chasing short-term gains.</p>
    `,

        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
        category: "Business",
        author: {
            name: "Amit Verma",
            avatar: "https://i.pravatar.cc/150?img=15",
            bio: "Market Analyst and Business Journalist specializing in stock markets and economic policy."
        },
        date: "2024-12-16",
        time: "5 hours ago",
        readTime: "6 min read",
        views: "198K",
        trending: false,
        tags: ["Stock Market", "Sensex", "Economy", "Investment", "Finance"]
    },
    {
        id: 6,
        title: "Bollywood Celebrates 100 Years: Grand Centenary Event in Mumbai",
        slug: "bollywood-100-years-centenary-celebration",
        excerpt: "Star-studded event commemorates century of Indian cinema with tribute to legendary filmmakers and actors.",

        images: [
            {
                url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
                caption: "Grand stage setup at Bollywood centenary celebration",
                credit: "Film Federation"
            },
            {
                url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop",
                caption: "Bollywood legends grace the red carpet",
                credit: "Reuters"
            },
            {
                url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1200&h=600&fit=crop",
                caption: "Musical performance celebrating 100 years of cinema",
                credit: "AFP"
            },
            {
                url: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200&h=600&fit=crop",
                caption: "Film memorabilia exhibition at the venue",
                credit: "Getty Images"
            },
            {
                url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=600&fit=crop",
                caption: "Classic movie scenes projected during tribute",
                credit: "PTI"
            },
            {
                url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=600&fit=crop",
                caption: "Audience gives standing ovation to industry veterans",
                credit: "ANI"
            }
        ],

        videos: [
            {
                url: "https://www.youtube.com/watch?v=pRpeEdMmmQ0",
                title: "Bollywood 100 Years: Complete Celebration Highlights",
                caption: "Watch the complete highlights from the star-studded Bollywood centenary celebration in Mumbai"
            },
            {
                url: "https://www.youtube.com/watch?v=gRp_bVP3j8E",
                title: "100 Years of Bollywood: A Documentary Journey",
                caption: "Special documentary chronicling the evolution of Indian cinema from silent films to the digital age"
            }
        ],

        content: `
      <p>The Indian film industry celebrated its 100th anniversary with a spectacular event at the Jio World Convention Centre in Mumbai. Bollywood's biggest stars, filmmakers, and legends gathered to honor a century of cinematic excellence that has entertained billions worldwide.</p>

      {{IMAGE_0}}

      <p>The event, attended by over 500 celebrities, marked exactly 100 years since the release of India's first feature film. The celebration was a testament to how far Indian cinema has come, from silent films to global blockbusters.</p>

      <h3>A Star-Studded Affair</h3>
      <p>The who's who of Bollywood graced the red carpet. From veteran actors like Amitabh Bachchan and Jaya Bachchan to current superstars like Shah Rukh Khan, Aamir Khan, and Deepika Padukone, the event was a true celebration of Indian cinema across generations.</p>

      {{VIDEO_0}}

      <p>International celebrities including Martin Scorsese, Christopher Nolan, and several Hollywood A-listers sent video messages congratulating Indian cinema on this milestone.</p>

      {{IMAGE_1}}

      <h3>Presidential Honor</h3>
      <p>The President of India was the chief guest and released a commemorative stamp celebrating 100 years of Indian cinema. In her address, she highlighted cinema's role in shaping Indian culture and its soft power globally.</p>

      <p>"Bollywood has given joy to billions across the world. It's a soft power that represents India's rich cultural heritage and diversity," the President said.</p>

      <h3>Tribute to Legends</h3>
      <p>The evening featured tributes to legendary filmmakers and actors who shaped Indian cinema. Iconic scenes from classics like Mother India, Sholay, Mughal-e-Azam, and Dilwale Dulhania Le Jayenge were screened, evoking nostalgia among the audience.</p>

      {{GALLERY}}

      <p>Lifetime achievement awards were presented to veteran actors and technicians who have contributed over five decades to the industry. Emotional speeches and standing ovations marked these special moments.</p>

      {{IMAGE_2}}

      <h3>100 Iconic Films</h3>
      <p>A panel of 500 film critics, historians, and industry experts curated a list of 100 most influential Indian films. The list spanning from 1924 to 2024 showcased the evolution of storytelling, technology, and artistic expression in Indian cinema.</p>

      {{VIDEO_1}}

      <p>A special exhibition featuring rare photographs, original scripts, costumes, and memorabilia from these films was inaugurated. The exhibition will travel to major cities across India over the next year.</p>

      <h3>Musical Extravaganza</h3>
      <p>The event concluded with a mesmerizing musical performance featuring songs from different eras of Bollywood. Leading playback singers performed iconic numbers, and the audience sang along to their favorite tunes.</p>

      <p>A special dance performance showcased the evolution of choreography in Indian films, from classical moves to contemporary fusion styles.</p>

      <h3>Looking Ahead</h3>
      <p>As the industry looks toward the future, several announcements were made about initiatives to preserve film heritage, support independent cinema, and promote Indian films globally.</p>

      <p>A ₹500 crore fund was announced to digitize and restore classic Indian films. This will ensure that future generations can experience the magic of early Indian cinema.</p>

      <p>The centenary celebration reminded everyone of cinema's power to unite, inspire, and entertain. As the curtains closed on this grand event, the industry looks forward to the next century of storytelling magic.</p>
    `,

        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
        category: "Entertainment",
        author: {
            name: "Karan Malhotra",
            avatar: "https://i.pravatar.cc/150?img=22",
            bio: "Entertainment Journalist covering Bollywood, regional cinema, and the global film industry."
        },
        date: "2024-12-16",
        time: "6 hours ago",
        readTime: "8 min read",
        views: "289K",
        trending: false,
        tags: ["Bollywood", "Cinema", "Entertainment", "Celebration", "Culture"]
    },
    {
        id: 7,
        title: "5G Network Coverage Expands to 500+ Cities: Digital India Milestone",
        slug: "5g-network-expansion-digital-india",
        excerpt: "Telecom operators achieve major milestone in 5G rollout, promising faster internet and new possibilities for IoT.",

        images: [
            {
                url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&h=600&fit=crop",
                caption: "5G tower installation across India",
                credit: "DOT India"
            },
            {
                url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=600&fit=crop",
                caption: "High-speed 5G connectivity demonstration",
                credit: "Reuters"
            },
            {
                url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop",
                caption: "Smart city applications powered by 5G",
                credit: "AFP"
            },
            {
                url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=600&fit=crop",
                caption: "Rural connectivity improving with 5G expansion",
                credit: "PTI"
            },
            {
                url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
                caption: "India's digital transformation map",
                credit: "Getty Images"
            },
            {
                url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=600&fit=crop",
                caption: "Telecom Minister announces 5G milestone",
                credit: "ANI"
            }
        ],

        videos: [
            {
                url: "https://www.youtube.com/watch?v=TechDemo5G",
                title: "5G in India: Speed Test and Coverage Analysis",
                caption: "Watch comprehensive speed tests and coverage analysis of 5G networks across major Indian cities"
            },
            {
                url: "https://www.youtube.com/watch?v=Future5GIndia",
                title: "How 5G Will Transform India: Expert Panel Discussion",
                caption: "Industry experts discuss the transformative impact of 5G on various sectors in India"
            }
        ],

        content: `
      <p>India's major telecom operators have successfully expanded 5G coverage to over 500 cities, marking a significant milestone in the Digital India initiative. The rapid rollout promises to revolutionize connectivity and enable new technologies across the country.</p>

      {{IMAGE_0}}

      <p>The Telecom Minister announced the milestone at a press conference in New Delhi, highlighting that India has achieved one of the fastest 5G rollouts globally. The expansion covers all major metropolitan areas and is rapidly extending to tier-2 and tier-3 cities.</p>

      <h3>5G Rollout Statistics</h3>
      <p>The numbers tell an impressive story of India's digital transformation. Over 500 cities now have 5G coverage, serving approximately 40 crore Indians. The average speed achieved is 500 Mbps, significantly higher than 4G networks.</p>

      {{VIDEO_0}}

      <p>The total investment by telecom operators has exceeded ₹2 lakh crore, and the rollout has created over 5 lakh direct and indirect jobs across the country.</p>

      {{IMAGE_1}}

      <h3>Impact on Various Sectors</h3>
      <p>The high-speed network is expected to boost sectors like healthcare, education, agriculture, and manufacturing. IoT applications, smart cities, and autonomous vehicles will benefit significantly from 5G connectivity.</p>

      {{GALLERY}}

      <p>In healthcare, 5G enables remote surgeries and real-time patient monitoring. Educational institutions can now offer immersive virtual reality-based learning experiences.</p>

      {{IMAGE_2}}

      <h3>Rural Connectivity Push</h3>
      <p>Rural areas are being prioritized in the next phase of expansion, with plans to cover 2,000+ towns by mid-2025. The government has set an ambitious target of achieving 95% population coverage by 2026.</p>

      {{VIDEO_1}}

      <p>Special subsidies and incentives are being provided to telecom operators for expanding coverage to remote and challenging terrains.</p>

      <h3>Economic Impact</h3>
      <p>Industry experts believe 5G will add $450 billion to India's economy over the next decade. The technology will enable new business models, improve productivity, and create millions of new jobs.</p>

      <p>Startups and enterprises are already developing innovative applications leveraging 5G capabilities, from augmented reality experiences to industrial automation solutions.</p>
    `,

        image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&h=600&fit=crop",
        category: "Technology",
        author: {
            name: "Rahul Kapoor",
            avatar: "https://i.pravatar.cc/150?img=25",
            bio: "Telecom Specialist covering digital infrastructure and connectivity trends."
        },
        date: "2024-12-16",
        time: "7 hours ago",
        readTime: "5 min read",
        views: "112K",
        trending: false,
        tags: ["5G", "Telecom", "Digital India", "Technology"]
    },
    {
        id: 8,
        title: "Ancient Yoga Techniques Gain Global Recognition: WHO Approves Guidelines",
        slug: "ancient-yoga-who-approves-guidelines",
        excerpt: "World Health Organization recognizes yoga as effective complementary therapy for various health conditions.",

        images: [
            {
                url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=600&fit=crop",
                caption: "Yoga practice at sunrise - a global wellness tradition",
                credit: "Getty Images"
            },
            {
                url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop",
                caption: "WHO officials announce yoga guidelines",
                credit: "WHO"
            },
            {
                url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&h=600&fit=crop",
                caption: "International Yoga Day celebrations worldwide",
                credit: "Reuters"
            },
            {
                url: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=1200&h=600&fit=crop",
                caption: "Corporate yoga programs gaining popularity",
                credit: "AFP"
            },
            {
                url: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1200&h=600&fit=crop",
                caption: "Children learning yoga in schools",
                credit: "PTI"
            },
            {
                url: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=1200&h=600&fit=crop",
                caption: "Yoga therapy sessions in hospitals",
                credit: "ANI"
            }
        ],

        videos: [
            {
                url: "https://www.youtube.com/watch?v=YogaWHO2024",
                title: "WHO Announces Yoga Guidelines: Complete Press Conference",
                caption: "Watch the complete WHO press conference announcing global yoga practice guidelines"
            },
            {
                url: "https://www.youtube.com/watch?v=YogaBenefits",
                title: "Scientific Benefits of Yoga: Research Findings",
                caption: "Medical experts explain the scientific evidence behind yoga's health benefits"
            }
        ],

        content: `
      <p>The World Health Organization (WHO) has officially recognized ancient Indian yoga techniques as effective complementary therapy for various health conditions. New guidelines recommend yoga for stress management, chronic pain, and mental wellness.</p>

      {{IMAGE_0}}

      <p>This recognition comes after extensive research involving 10,000+ participants across 50 countries. Studies showed significant improvements in mental health, flexibility, cardiovascular health, and overall well-being among regular yoga practitioners.</p>

      <h3>WHO Guidelines Highlights</h3>
      <p>The new guidelines cover multiple aspects of yoga practice and its therapeutic applications. Recommendations include yoga for stress and anxiety management, therapeutic yoga for chronic conditions, prenatal yoga, and corporate wellness programs.</p>

      {{VIDEO_0}}

      <p>The guidelines also emphasize the importance of integrating yoga with modern healthcare systems for holistic treatment approaches.</p>

      {{IMAGE_1}}

      <h3>Global Impact</h3>
      <p>The WHO recognition is expected to accelerate the global adoption of yoga as a mainstream wellness practice. Countries are being encouraged to include yoga in their national health programs.</p>

      {{GALLERY}}

      <p>India's Ministry of AYUSH welcomed the move, calling it validation of ancient wisdom. The government plans to establish 100+ international yoga centers to promote authentic practices.</p>

      {{IMAGE_2}}

      <h3>Healthcare Integration</h3>
      <p>Major hospitals worldwide are now integrating yoga therapy into treatment protocols. Cancer centers, rehabilitation facilities, and mental health institutions are leading this integration.</p>

      {{VIDEO_1}}

      <p>Medical insurance companies in several countries are starting to cover yoga therapy as part of treatment plans, making it accessible to more people.</p>

      <h3>Training and Certification</h3>
      <p>Global demand for certified yoga instructors has surged by 300%. India is developing standardized certification programs recognized internationally to meet this demand.</p>

      <p>Universities and medical schools are including yoga in their curricula, preparing healthcare professionals to recommend and supervise yoga practices.</p>

      <p>"This is a proud moment for India. Yoga is our gift to the world for health and harmony," said the AYUSH Minister.</p>
    `,

        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=600&fit=crop",
        category: "Lifestyle",
        author: {
            name: "Dr. Meera Patel",
            avatar: "https://i.pravatar.cc/150?img=9",
            bio: "Wellness Expert and Health Journalist specializing in traditional medicine and holistic health."
        },
        date: "2024-12-16",
        time: "8 hours ago",
        readTime: "6 min read",
        views: "167K",
        trending: false,
        tags: ["Yoga", "Health", "WHO", "Wellness", "Lifestyle"]
    }
];

// Helper functions
export const getArticleBySlug = (slug) => {
    return allArticles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (category) => {
    if (category === 'Home') return allArticles;
    return allArticles.filter(article => article.category === category);
};

export const getTrendingArticles = () => {
    return allArticles.filter(article => article.trending).slice(0, 5);
};

export const getRelatedArticles = (currentArticleId, category, limit = 3) => {
    return allArticles
        .filter(article => article.id !== currentArticleId && article.category === category)
        .slice(0, limit);
};

export const searchArticles = (query) => {
    const lowerQuery = query.toLowerCase();
    return allArticles.filter(article =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.content.toLowerCase().includes(lowerQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
};