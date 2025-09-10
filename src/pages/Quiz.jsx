import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  RotateCcw,
  Trophy,
  CheckCircle,
  XCircle,
  Folder,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// Sample questions data - distributed across 3 folders
const questionsData = {
  folder1: [
    {
      id: 1,
      question: ` Text for questions number 1-5
       Rumah Tongkonan 

The Tongkonan is a traditional house of South Sulawesi heritage. The word "tongkonan" comes from the word "tongkon," meaning "to sit" or "to sit." This house serves as the center of government, customary authority, and the development of the socio-cultural life of the Torajan people.

The curved roof of a Tongkonan resembles a boat or a buffalo horn. The roof is constructed of bamboo and covered with black palm fiber. The front of this traditional house features decorations made of buffalo horn. Like most houses, the interior serves as a bedroom and kitchen. Equally unique are the carvings around the house, which add to its beauty. These carvings feature harmonious curved lines. The varying number of rooms in a Tongkonan carries social and economic significance. The more rooms, the higher the Tongkonan's status. Furthermore, the decorative patterns on the Tongkonan also convey social, economic, and magical religious meanings, particularly those related to the realities of Torajan life.

Indonesia's rich cultural heritage is truly one of the Tongkonan traditional houses, a legacy that deserves to be preserved.

Based on the text, the function of a tongkonan house is`,
      options: [
        "As a place to sleep",
        "As a place for discussions, traditional ceremonies, a place to rest, and a place to shelter from wild animals",
        "As a place to preserve culture and can be used as a tourist attraction",
        "As a center of government, traditional authority, and the development of the socio-cultural life of the Torajan people.",
      ],
      correctAnswer: 3,
      explanation:
        "As a center of government, traditional authority, and the development of the socio-cultural life of the Torajan people.",
    },
    {
      id: 2,
      question: "What makes a tongkonan house unique?",
      options: [
        "Because it is located in Toraja",
        "Because there are buffalo horns in front of the house",
        "Because of the carvings around the house",
        "Because of its social significance",
      ],
      correctAnswer: 2,
      explanation: "Because of the carvings around the house",
    },
    {
      id: 3,
      question: "Its beauty the underlined word refers to...",
      options: [
        "Tongkonan house",
        "The buffalo horn",
        "The interior",
        "The roof",
      ],
      correctAnswer: 0,
      explanation: "Its beauty the underlined word refers to Tongkonan house",
    },
    {
      id: 4,
      question: "The synonym for the word particularly in second paragraph is…",
      options: ["Spesiffically", "Especially", "Regularly", "Beautifully"],
      correctAnswer: 1,
      explanation:
        "The synonym for the word particularly in second paragraph is Especially",
    },
    {
      id: 5,
      question:
        "What should we do as Indonesian people to preserve the tongkonan houses?",
      options: [
        "By destroying them",
        "Participating in preserving and introducing traditional Indonesian houses to the world through various sources",
        "Preserving by stealing buffalo horns for one's own collection",
        "Acting normally",
      ],
      correctAnswer: 1,
      explanation:
        "Participating in preserving and introducing traditional Indonesian houses to the world through various sources",
    },
    {
      id: 6,
      question: ` (Text for questions number 6-10)                                                      
            Serimpi Dance 

      The Serimpi dance is a classical dance originating from Central Java. It is usually performed by four female dancers.

      The main characteristic of this dance is the dancers' gentle and graceful movements, reflecting the demeanor of Javanese women. Props such as a keris (a dagger) are used, usually tucked into the dancer's waist. The floor plan is typically horizontal or straight, and the dance is accompanied by Javanese gamelan music. More than just a dance, the Serimpi dance symbolizes the perfection of Javanese women's character, symbolizes control over lust, and often features stories like the Ramayana.

      The Serimpi dance is incredibly beautiful to look at because of its gentle movements, without any sense of being rushed. Therefore, it is important for us to preserve it together "It is usually performed by four female dancers." The word "it" refers to...`,
      options: [
        "Serimpi dance",
        "Central Java",
        "Dancers",
        "Dance performance",
      ],
      correctAnswer: 0,
      explanation: "Serimpi dance",
    },
    {
      id: 7,
      question: "What are the main characteristic of Serimpi dance?",
      options: [
        "The main characteristic is that this dance is danced by four dancers",
        "The characteristic is the graceful movements of the dancers.",
        "The main characteristic of Serimpi dance is its energetic and smooth movements.",
        "The main characteristic is the gentle and graceful movements of the dancers.",
      ],
      correctAnswer: 3,
      explanation:
        "The main characteristic is the gentle and graceful movements of the dancers.",
    },
    {
      id: 8,
      question: "The props commonly used in Serimpi dance is...",
      options: ["Sword", "Knife", "Keris", "Badik"],
      correctAnswer: 2,
      explanation: "Keris",
    },
    {
      id: 9,
      question: "What does Serimpi dance symbolize?",
      options: [
        "Social order in Javanese culture.",
        "Symbol of resistance, courage, and the movement of Javanese women",
        "Symbol of the majesty of the creator and the purity of women.",
        "Perfection of Javanese women's character, symbolize over lust, and often features like the Ramayana story",
      ],
      correctAnswer: 3,
      explanation:
        "Symbol of the majesty of the creator and the purity of women.",
    },
    {
      id: 10,
      question:
        "The word incredibly has synonyms, choose the synonym for that word!",
      options: ["amazingly", "astonishingly", "uncommonly", "unexpectedly"],
      correctAnswer: 0,
      explanation: "amazingly",
    },
  ],
  folder2: [
    {
      id: 26,
      question: `Text for questions number 1-6
       The Saman dance is a traditional dance originating from Aceh. It is a medium for conveying messages (da'wah) and is performed by men. This dance embodies religious education, manners, heroism, unity, and togetherness.

The Saman dancers are an odd number. They sing lyrics in Gayo and Arabic while dancing. In addition to singing, the Saman dancers' movements are accompanied by musical instruments such as drums, shouts, handclaps, chest slaps, and thigh slaps. The movements in this dance are called goyang, kirep, lingang, and surang-saring (all of these movements are named in Gayo). The Saman dance costume consists of three parts. The head is worn with a bulang teleng (a traditional headdress) and unduk kepies (a traditional headdress). The body is worn with a baju sarung (a traditional shirt), trousers, and a sarong. The hands are worn with a bracelet and a handkerchief.

The use of songs, movements, and even the dancers' costumes in the Saman Dance is very important because it contains values that show the cultural identity, unity, wisdom, strength, courage, and harmony of the wearers.
(Source: https://www.ruangguru.com/blog/contoh-teks-deskripsi-dan-strukturnya)


Apart from being a traditional dance, what are the other functions of the saman dance?`,
      options: [
        "Medium for conveying messages (da'wah) ",
        "As a means of community entertainment",
        "As a means of ritual traditional ceremonies",
        "As a means of socializing between residents",
      ],
      correctAnswer: 0,
      explanation: "Medium for conveying messages (da'wah)",
    },
    {
      id: 27,
      question:
        "(It) is a medium for conveying messages..” The word caged refers to?",
      options: ["Aceh", "The Saman dance", "Traditional dance", "Dancers"],
      correctAnswer: 1,
      explanation: "The Saman dance",
    },
    {
      id: 28,
      question:
        "Which part of the text serves as the identification of the descriptive text?",
      options: [
        "The explanation about the use of songs, movements, and costumes in the dance",
        "The introduction stating that the Saman dance is a traditional dance from Aceh",
        "The details of the dance movements, such as goyang, kirep, lingang, and surang-saring",
        "The description of the Saman dancers’ costumes consists of head, body, and hand parts",
      ],
      correctAnswer: 1,
      explanation: "Sword",
    },
    {
      id: 29,
      question:
        "Why is the use of songs, movements, and costumes in the Saman dance considered important?",
      options: [
        "Because they make the performance more entertaining",
        "Because they symbolize cultural values and identity",
        "Because they help the dancers memorize the choreography",
        "Because they replace the role of musical instruments",
      ],
      correctAnswer: 1,
      explanation:
        "Symbol of the majesty of the creator and the purity of women.",
    },
    {
      id: 30,
      question: "Which paragraph shows a description of the Saman dance?",
      options: [
        "The second paragraph",
        "The first paragraph",
        "The third paragraph",
        "The entire paragraph of text",
      ],
      correctAnswer: 0,
      explanation: "The second paragraph",
    },
    {
      id: 31,
      question:
        "In the descriptive text about the Saman dance, what is the main function of the identification?",
      options: [
        "To evaluate the values contained in the dance",
        "To give general information and introduce the object described",
        "To explain the background of Acehnese culture",
        "To show the importance of costumes and music",
      ],
      correctAnswer: 1,
      explanation:
        "The identification serves to give general information and introduce the Saman dance as a traditional dance from Aceh.",
    },
    {
      id: 32,
      question:
        "The section below that shows the identification in the descriptive text is...",
      options: [
        "“Kujang is a traditional weapon that originated in West Java. This weapon has a high aesthetic value…”",
        "“…The shape of the Kujang itself is very unique, resembling the shape of fire in ancient mythology. In addition, the carving on the blade resembles the shape of batik….”",
        "“….Kujang needs to be preserved, in addition to having the aesthetic value of this weapon, as well as an invaluable cultural heritage…”",
        "“…The kujang sarongs are made of simple materials, usually made of black fabric…”",
      ],
      correctAnswer: 0,
      explanation:
        "“Kujang is a traditional weapon that originated in West Java. This weapon has a high aesthetic value…”",
    },
    {
      id: 33,
      question: `
       (Text for number 8-10)                                                                     Celurit

      This traditional Indonesian weapon comes from Madura, an island in East Java, the name is celurit.

      Celurit is a sickle-shaped weapon made of iron or steel. The blade is curved, sharp, and usually shines brightly because it is well-polished. The handle is often made of wood and carved beautifully, sometimes decorated with traditional ornaments. Cellurit holds a deep philosophy for the people of Madura. Its curved shape resembles a crescent moon symbolizing the cycle of life, balance, and harmony with nature.

      UNESCO has recognized Celurit as a World Heritage Site; to date, it remains quite sustainable.


      What is the physical shape of celurite?`,
      options: [
        "The blade is curved, sharp, and usually shines brightly",
        "Sharp and non-warping",
        "Shaped like a long sword",
        "The blade is curved",
      ],
      correctAnswer: 0,
      explanation: "The blade is curved, sharp, and usually shines brightly",
    },
    {
      id: 34,
      question:
        "What is the symbolic meaning of the curved shape of celurit for the Madurese people?",
      options: [
        "Power and bravery",
        "Cycle of life, balance, and harmony with nature",
        "Protection from enemies",
        "Wealth and prosperity",
      ],
      correctAnswer: 1,
      explanation:
        "The curved shape of celurit symbolizes the cycle of life, balance, and harmony with nature.",
    },
    {
      id: 35,
      question:
        "UNESCO has recognized celurit as a world cultural heritage. What is the possible impact of this recognition?",
      options: [
        "Celurit will only be used as a farming tool",
        "Celurit will no longer be produced in Madura",
        "Celurit will gain more attention and be preserved as culture",
        "Celurit will lose its cultural meaning",
      ],
      correctAnswer: 2,
      explanation:
        "Celurit will gain more attention and be preserved as culture",
    },
  ],
  folder3: [
    {
      id: 11,
      question: ` Text for questions number 1-5
       Dugderan 

Dugderan is a traditional welcome to the holy month of Ramadan, originating from the city of Semarang, Central Java. The word "dug" comes from the sound of the bedug, and "der" from the sound of the cannon.

The Dugderan tradition is carried out from morning until sunset. The Dugderan tradition will begin with a pasar rakyat and then continue with a carnival such as the warak ngendok event, which will be enlivened by a procession. After the pasar rakyat and carnival, the announcement of the start of fasting is made by the beating of the drum (bedug). The tradition concludes with a communal prayer.

This tradition is not just a traditional festival but also a manifestation of cultural diversity, reflecting togetherness, peace, religiousness, and local cultural values. Dugderan is not only a ceremony but also a symbol of the unity of the Semarang people

What does the word "dug" in Dugderan represent?`,
      options: [
        "The sound of the cannon",
        "The sound of the bedug",
        "The carnival sound",
        "The warak ngendok event",
      ],
      correctAnswer: 1,
      explanation:
        "The sound of the bedug",
    },
    {
      id: 12,
      question: "What is the correct order of the Dugderan activities?",
      options: ["Carnival → Pasar rakyat → Communal prayer → Beating of bedug", "Pasar rakyat → Carnival → Beating of bedug → Communal prayer", "Beating of bedug → Carnival → Pasar rakyat → Communal prayer", "Communal prayer → Carnival → Pasar rakyat → Beating of bedug"],
      correctAnswer: 1,
      explanation:
        "Pasar rakyat → Carnival → Beating of bedug → Communal prayer",
    },
    {
      id: 13,
      question: "What is the synonym of the word unity in the third paragraph?",
      options: [
        "Harmony",
        "Separation",
        "Disunion",
        "Divorce",
      ],
      correctAnswer: 1,
      explanation:
        "Separation",
    },
    {
      id: 14,
      question: "Which one shows the identification part in the description text above?",
      options: [
        "The Dugderan tradition is carried out from morning until sunset. The Dugderan tradition will begin with a pasar rakyat and then continue with a carnival such as the warak ngendok event, which will be enlivened by a procession.",
        "After the pasar rakyat and carnival, the announcement of the start of fasting is made by the beating of the drum (bedug). The tradition concludes with a communal prayer.",
        "Dugderan is a traditional welcome to the holy month of Ramadan, originating from the city of Semarang, Central Java. The word (dug) comes from the sound of the bedug, and (der) from the sound of the cannon.",
        "This tradition is not just a traditional festival but also a manifestation of cultural diversity, reflecting togetherness, peace, religiousness, and local cultural values. ",
      ],
      correctAnswer: 2,
      explanation:
        "Dugderan is a traditional welcome to the holy month of Ramadan, originating from the city of Semarang, Central Java. The word (dug) comes from the sound of the bedug, and (der) from the sound of the cannon.",
    },
    {
      id: 15,
      question: "Why can Dugderan be considered more than just a festival?",
      options: ["Because it is held in the morning until evening", "Because it involves warak ngendok and pasar rakyat.", "Because it reflects unity, peace, and cultural values.", "Because it starts with the sound of a drum."],
      correctAnswer: 2,
      explanation:
        "Because it involves warak ngendok and pasar rakyat.",
    },
    {
      id: 50,
      question: ` (Text for questions number 6-10)
       Rumah Gadang 

Rumah Gadang is the traditional house of the Minangkabau people in West Sumatra, Indonesia.

This traditional house has a unique shape and architecture, with a pointed roof resembling buffalo horns. Its rectangular architecture is divided into two sections: a front section decorated with various carved ornaments and a rear section covered in split bamboo. The house uses long pillars and is designed to be strong and stable. The interior of the rumah gadang consists of two main sections: the lanjar section and the free space. These two are further divided into several rooms, including the rangkiang (rice barn), a kitchen, bedrooms, and a room where the traditional leader is crowned or other rituals are performed. This house is not only a place to live but also a place to perform various traditional ceremonies. 

Rumah gadang is one of the unique traditional house heritage because of the shape of the roof, this house is not only a cultural heritage but also a symbol and identity of the West Sumatran people. 

Why is the rumah gadang unique?`,
      options: [" Because the carving of the house", "Because rumah gadang has a unique shape and architecture, with a pointed roof resembling buffalo horns", "The interior of rumah gadang", "Because the house has a rice barn"],
      correctAnswer: 1,
      explanation:
        "Because rumah gadang has a unique shape and architecture, with a pointed roof resembling buffalo horns.",
    },
    {
      id: 51,
      question: "Which section of the text provides detailed information about the physical features of Rumah Gadang?",
      options: ["“This traditional house has a unique shape and architecture, with a pointed roof resembling buffalo horns…”", "“Rumah Gadang is the traditional house of the Minangkabau people in West Sumatra, Indonesia…”", "“These two are further divided into several rooms, including the rangkiang (rice barn), a kitchen, bedrooms, and a room where the traditional leader is crowned or other rituals are performed…”", "“The house uses long pillars and is designed to be strong and stable.”"],
      correctAnswer: 0,
      explanation:
        "“This traditional house has a unique shape and architecture, with a pointed roof resembling buffalo horns…”",
    },
    {
      id: 52,
      question: "Which sentence can be considered as the concluding statement of the descriptive text?",
      options: ["“This traditional house has a unique shape and architecture, with a pointed roof resembling buffalo horns…”", "“Rumah Gadang is the traditional house of the Minangkabau people in West Sumatra, Indonesia…”", "“These two are further divided into several rooms, including the rangkiang (rice barn), a kitchen, bedrooms, and a room where the traditional leader is crowned or other rituals are performed…”", "“Rumah gadang is one of the unique traditional house heritage because of the shape of the roof, this house is not only a cultural heritage but also a symbol and identity of the West Sumatran people…”"],
      correctAnswer: 3,
      explanation:
        "Public adalah access modifier yang menentukan tingkat akses!",
    },
    {
      id: 53,
      question: "Rice barn di Sumatra barat disebut dengan apa?",
      options: ["Rangkiang", "Pillars", "Buffalo horn", "Lanjar"],
      correctAnswer: 0,
      explanation:
        "Rangkiang adalah sebutan untuk lumbung padi di Sumatra Barat.",
    },
    {
      id: 54,
      question: "Which statement best explains why Rumah Gadang is considered more than just a house?",
      options: ["Because it is decorated with beautiful ornaments", "Because it functions as both a home and a place for traditional ceremonies", "Because it has a rectangular architectural design", "Because it uses bamboo and long wooden pillars"],
      correctAnswer: 1,
      explanation:
        "Because it functions as both a home and a place for traditional ceremonies",
    },
  ],
  folder4: [
    {
      id: 16,
      question: ` Text for questions number 1-8
       Rumah Honai

The Rumah Honai is the traditional house of the Dani people in Papua, especially in Papua Pegunungan.

Its half-ball shape makes it unique. The building is made of wood and has a thatched roof to protect against wind and rain. It also has no windows to maintain warmth in the cold climate of the Papuan highlands. The Rumah Honai is about 2-2.5 meters high and consists of two floors. The first floor is usually used for sleeping, and the second floor is used for various activities such as relaxing, eating, and making handicrafts. In addition to being a residence, the Honai is also used for deliberation. This house reflects the culture of mutual cooperation and communal life of the Dani people.

The Rumah Honai adds to the long list of cultural richness and diversity in Indonesia. This diversity deserves to be preserved.

What is the purpose of the text?`,
      options: [
        "To describe the Honai House to the reader",
        "To entertain the reader",
        "To provide a deeper understanding of the Honai House to the reader",
        "To inform the reader about the contents of the Honai House",
      ],
      correctAnswer: 0,
      explanation:
        "To describe the Honai House to the reader",
    },
    {
      id: 17,
      question: "Which provides a physical description of the exterior of a Honai House?",
      options: ["“…The first floor is usually used for sleeping, and the second floor is used for various activities…”", "“…This house reflects the culture of mutual cooperation and communal life of the Dani people…”", "“…Its half-ball shape makes it unique. The building is made of wood…”", "“…The Honai House is the traditional house of the Dani people in Papua…”"],
      correctAnswer: 2,
      explanation: "“…Its half-ball shape makes it unique. The building is made of wood…”",
    },
    {
      id: 18,
      question: "Why is the Honai House built without windows?",
      options: [
        "To protect the house from wild animals",
        "To enhance aesthetic appeal",
        "To protect the house from rain",
        "To maintain a warm temperature inside the house",
      ],
      correctAnswer: 3,
      explanation:
        "To maintain a warm temperature inside the house",
    },
    {
      id: 19,
      question: "Which of the following is correct?",
      options: ["The Rumah Honai does not have windows to enhance its aesthetic appeal", "The second floor of the Rumah Honai is used for various activities, such as making handicrafts", "The Rumah Honai is more than 5 meters high", "The Rumah Honai is the traditional house of all tribes in Papua"],
      correctAnswer: 1,
      explanation:
        "The second floor of the Rumah Honai is used for various activities, such as making handicrafts",
    },
    {
      id: 20,
      question: "“…(It) also has no windows to maintain warmth…” The parentheses word refers to...",
      options: [
        "House",
        "Roof",
        "Rumah Honai",
        "Dani people",
      ],
      correctAnswer: 2,
      explanation:
        "Rumah Honai",
    },
    {
      id: 60,
      question: "What cultural values of the Dani people can be inferred from the use of the Rumah Honai for both living and deliberation?",
      options: [
        "They prefer to live in isolation",
        "They value individual privacy above all",
        "They practice mutual cooperation and community life",
        "They avoid gathering in groups",
      ],
      correctAnswer: 2,
      explanation:
        "They value individual privacy above all",
    },
    {
      id: 61,
      question: "How does the Rumah Honai contribute to Indonesia's cultural richness?",
      options: [
        "By showing that Dani people prefer small houses",
        "By adding diversity that represents adaptation and traditions",
        "By proving that modern houses are less useful",
        "By showing the similarity of all Indonesian houses",
      ],
      correctAnswer: 1,
      explanation:
        "By adding diversity that represents adaptation and traditions",
    },
    {
      id: 62,
      question: "What information in the description section helps us understand the Rumah Honai's function in the community?",
      options: [
        "It is the traditional house of the Dani people.",
        "Its half-ball shape makes it unique.",
        "It is used for deliberation and daily activities.",
        "The Rumah Honai adds to Indonesia's cultural richness",
      ],
      correctAnswer: 2,
      explanation:
        "It is used for deliberation and daily activities.",
    },
    {
      id: 63,
      question: "Which sentence is the identification of the text?",
      options: [
        "“…The dancers wear traditional costumes and perform powerful movements…”",
        "“…Reog Ponorogo is a traditional dance from Ponorogo, East Java…”",
        "“…Reog Ponorogo is usually shown at cultural festivals…”",
        "“…This dance represents the strength and pride of the Ponorogo people...”",
      ],
      correctAnswer: 1,
      explanation:
        "“…Reog Ponorogo is a traditional dance from Ponorogo, East Java…”",
    },
    {
      id: 64,
      question: "Why is the sentence “Reog Ponorogo is a traditional dance from Ponorogo, East Java” considered identification?",
      options: [
        "Because it gives details of the costume.",
        "Because it introduces the dance and tells what it is.",
        "Because it explains the performance events.",
        "Because it describes the dancers' strength",
      ],
      correctAnswer: 1,
      explanation:
        "Because it introduces the dance and tells what it is.",
    },
  ],
  folder5: [
    {
      id: 21,
     question: ` 
       Seren Raun Ceremony

The wealth of the Indonesian state can be seen from various existing traditional ceremonies, one of which is Seren Raun, which comes from the Sundanese tribe, one of which is in the Banten area. The word "Seren" in Sundanese means deliver, while "tahun" means year.

This traditional ceremony is carried out as an expression of gratitude for the agricultural products obtained by the community. The first stage carried out in this ceremony is the determination of the date of the event, this process is called Netepakeun which is followed by religious leaders and village elders. Then, after the date is set, there will be a pilgrimage ritual to the tomb of the ancestor. In total, there are four rituals in the implementation of Seren Raun that are carried out for seven days. First, the opening ritual is called sewn resin which means a thousand lanterns, as a light of the soul; second, the expression of prayer and love from farmers in managing rice fields to avoid pest disturbances; the third night of spiritual songs as spiritual activities of various religions, customs, and beliefs; and the fourth is the peak procession of Seren Taun held on the 22nd of Rayagung, containing artistic offerings, ngajayak as an offering of produce (various fruits and grains), babarit (a series of spiritual songs, prayers, and mantras called rajah pwahaci). Next, pounded the rice and closed with a meal together. 

This traditional ceremony has been recognized by UNESCO as an intangible traditional heritage. Seren Raun is a place to express gratitude to the creator.

What is the purpose of the text?`,
      options: [
        "To entertain the reader about Seren Raun",
        "To explain the procedure of the Seren Raun ceremony",
        "To describe the Seren Raun ceremony",
        "To give the author's views on the Seren Raun ceremony",
      ],
      correctAnswer: 2,
      explanation:
        "To describe the Seren Raun ceremony",
    },
    {
      id: 22,
      question: "Why is the Seren Raun ceremony held?",
      options: ["As a means of socializing between residents", "As a form of gratitude for abundant agricultural products", "As a form of self-reflection", "As a ceremony carried out to improve the economy of the residents"],
      correctAnswer: 1,
      explanation: "As a form of gratitude for abundant agricultural products",
    },
    {
      id: 23,
      question: "What is the first thing to do before the Seren Raun event starts?",
      options: [
        "Collecting agricultural products",
        "Donating agricultural products",
        "Setting dates by religious leaders and village elders",
        "Holding agricultural deliberations between religious leaders and village elders",
      ],
      correctAnswer: 2,
      explanation:
        "Setting dates by religious leaders and village elders",
    },
    {
      id: 24,
      question: "The sequence of rituals in Seren Raun shows that the community values both spirituality and agriculture. Which statement best supports this idea?",
      options: ["The ceremony begins with determining the date of the event.", "The rituals include prayers, pilgrimages, and offerings of crops.", "Seren Raun is celebrated only in the Banten area.", "UNESCO recognized it as an intangible cultural heritage."],
      correctAnswer: 1,
      explanation:
        "The rituals include prayers, pilgrimages, and offerings of crops.",
    },
    {
      id: 25,
      question: "“ The wealth of the Indonesian state can be seen from various existing traditional ceremonies, one of which is Seren Raun, who comes from the Sundanese tribe, one of which is in the Banten area. The word “Seren” in Sundanese means deliver, while “tahun” means year.” The text fragment next to it is the generic structure of descriptive text, namely…",
      options: [
        "Identification",
        "Description",
        "Conclusion",
        "Re-Orientation",
      ],
      correctAnswer: 0,
      explanation:
        "Identification",
    },
    {
      id: 76,
       question: `
       Text for number 6-7 
       Rumah Joglo

Joglo is a traditional house from Central Java, Indonesia. The house has a unique roof consisting of two triangular roofs and two trapezoidal roofs, creating a majestic and functional structure with four main pillars. This house is usually made of teak wood and has a large open space. Joglo is not only a house, but also a symbol of Javanese social and cultural status.

Which part shows the description of the text?`,
      options: [
        "” Joglo is a traditional house from Central Java, Indonesia…”",
        "“…Joglo is not only a house, but also a symbol of Javanese social and cultural status”",
        "“…This house is usually made of teak wood and has a large open space. Joglo is not only a house, but also a symbol of Javanese social and cultural status…”",
        "“…The house has a unique roof consisting of two triangular roofs and two trapezoidal roofs, creating a majestic and functional structure with four main pillars. This house is usually made of teak wood and has a large open space…”",
      ],
      correctAnswer: 3,
      explanation:
        "“…The house has a unique roof consisting of two triangular roofs and two trapezoidal roofs, creating a majestic and functional structure with four main pillars. This house is usually made of teak wood and has a large open space…”",
    },
    {
      id: 77,
      question: "Apart from being a house, a joglo also symbolizes...",
      options: [
        "Symbol of Javanese social and cultural status.",
        "Identity of the Javanese",
        "Peace and purity of the Javanese people",
        "Symbols of Central Java society",
      ],
      correctAnswer: 0,
      explanation:
        "Symbol of Javanese social and cultural status.",
    },
    {
      id: 78,
      question: "Which of the following is usually found in a descriptive text?",
      options: [
        "Orientation – Events – Reorientation",
        "Identification – Description",
        "General Statement – Explanation – Closing",
        "Issue – Arguments – Conclusion",
      ],
      correctAnswer: 1,
      explanation:
        "Identification – Description",
    },
    {
      id: 79,
      question: "“Jaipong dance is a traditional dance from West Java...” The descriptive text piece on the side is part of....” ",
      options: [
        "Description",
        "Identification",
        "Conclusion",
        "Series of events",
      ],
      correctAnswer: 1,
      explanation:
        "Identification",
    },
    {
      id: 80,
      question: "What is the main purpose of a descriptive text?",
      options: [
        "To tell past experiences",
        "To describe a person, place, or thing in detail",
        "To explain how to make something",
        "To persuade people to agree with an opinion",
      ],
      correctAnswer: 1,
      explanation:
        "To describe a person, place, or thing in detail",
    },
  ]
};

const Quiz = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("folders"); // 'folders', 'quiz'
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);

  const folders = [
    {
      id: "folder1",
      name: "Exercise 1",
      description: "",
      questionCount: questionsData.folder1.length,
      icon: "🏠",
    },
    {
      id: "folder2",
      name: "Exercise 2",
      description: "",
      questionCount: questionsData.folder2.length,
      icon: "🏠",
    },
    {
      id: "folder3",
      name: "Exercise 3",
      description: "",
      questionCount: questionsData.folder3.length,
      icon: "🏠",
    },
    {
      id: "folder4",
      name: "Exercise 4",
      description: "",
      questionCount: questionsData.folder4.length,
      icon: "🏠",
    },
    {
      id: "folder5",
      name: "Exercise 5",
      description: "",
      questionCount: questionsData.folder5.length,
      icon: "🏠",
    },
  ];

  const addPoints = (points, questionId) => {
    // Cek apakah pertanyaan sudah dijawab sebelumnya
    if (!answeredQuestions.includes(questionId)) {
      setTotalPoints((prev) => prev + points);
      setAnsweredQuestions((prev) => [...prev, questionId]);
    }
  };

  const handleFolderClick = (folderId) => {
    setSelectedFolder(folderId);
    setCurrentView("quiz");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setShowFeedback(false);
    setIsCorrect(false);
    setConfetti(false);
    setQuestionHistory([0]);
  };

  const handleBackToFolders = () => {
    setCurrentView("folders");
    setSelectedFolder(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    const correct =
      answerIndex ===
      questionsData[selectedFolder][currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Add answer to answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: questionsData[selectedFolder][currentQuestion].id,
      selected: answerIndex,
      correct: questionsData[selectedFolder][currentQuestion].correctAnswer,
      isCorrect: correct,
    };
    setAnswers(newAnswers);

    // Add points if correct (10 points per correct answer)
    if (correct) {
      addPoints(10, questionsData[selectedFolder][currentQuestion].id);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questionsData[selectedFolder].length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(
        answers[nextQuestion]?.selected !== undefined
          ? answers[nextQuestion].selected
          : null
      );
      setShowFeedback(false);
      setIsCorrect(false);

      // Add to history
      setQuestionHistory((prev) => [...prev, nextQuestion]);
    } else {
      setShowResult(true);
      // Check if perfect score for confetti
      const score = (answers.filter((a) => a && a.isCorrect).length) * 10;
      if (score === questionsData[selectedFolder].length * 10) {
        setConfetti(true);
        setTimeout(() => setConfetti(false), 3000);
      }
    }
  };

  const handlePrevious = () => {
    if (questionHistory.length > 1) {
      // Remove current question from history
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevQuestion = newHistory[newHistory.length - 1];

      setCurrentQuestion(prevQuestion);
      setSelectedAnswer(
        answers[prevQuestion]?.selected !== undefined
          ? answers[prevQuestion].selected
          : null
      );
      setShowFeedback(answers[prevQuestion] !== undefined);
      setIsCorrect(answers[prevQuestion]?.isCorrect || false);
      setQuestionHistory(newHistory);
    }
  };

  const calculateScore = () => {
    return answers.filter((answer) => answer && answer.isCorrect).length * 10;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setShowFeedback(false);
    setIsCorrect(false);
    setConfetti(false);
    setQuestionHistory([0]);
  };

  const getScoreMessage = (score, total) => {
    if (score === total) return "🎉 Perfect! You're Amazing! 🎉";
    if (score >= total * 0.8) return "🌟 Excellent! Keep Learning! 🌟";
    if (score >= total * 0.6) return "👍 Good! Try Again! 👍";
    return "💪 Don't Give Up! Try Again! 💪";
  };

  if (currentView === "folders") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 relative overflow-hidden">
        {/* Header */}
        <header className="relative z-10 p-6">
          <div className="container mx-auto flex justify-between items-center">
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
            >
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </Button>

            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-blue-700 font-semibold">
                Total Points: {totalPoints}
              </p>
            </div>
          </div>
        </header>

        {/* Folders Selection */}
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Quiz Pratice
            </h1>
            <p className="text-xl text-gray-600">
              Choose a category to test your reading skills!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {folders.map((folder) => (
              <Card
                key={folder.id}
                onClick={() => handleFolderClick(folder.id)}
                className="bg-white/90 backdrop-blur-sm shadow-xl border-4 border-blue-200 cursor-pointer transform hover:-translate-y-2 transition-all duration-300 text-center"
              >
                <CardContent className="p-8">
                  <div className="text-6xl mb-6">{folder.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {folder.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{folder.description}</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <span className="text-blue-700 font-semibold">
                      {folder.questionCount} Questions
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const score = calculateScore();
    const totalQuestions = questionsData[selectedFolder].length * 10;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
        {/* Confetti Effect */}
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              >
                {["🎉", "🎊", "⭐", "🌟", "✨"][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}

        {/* Header */}
        <header className="p-6">
          <div className="container mx-auto flex justify-between items-center">
            <Button
              onClick={handleBackToFolders}
              variant="outline"
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Category
            </Button>

            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-blue-700 font-semibold">
                Total Points: {totalPoints}
              </p>
            </div>
          </div>
        </header>

        {/* Results */}
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-yellow-200">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Trophy className="w-16 h-16 text-white" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4">
                  Quiz Result
                </h1>

                <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  {getScoreMessage(score, totalQuestions)}
                </p>
              </div>

              {/* Score Display */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 mb-8">
                <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                  {score}/{totalQuestions}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
                  {percentage}%
                </div>
                <Progress value={percentage} className="h-4 mb-4" />
              </div>

              {/* Question Review */}
              <div className="grid gap-4 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  📝 Answer Review
                </h3>
                {questionsData[selectedFolder].map((question, index) => {
                  const userAnswer =
                    answers[index] ||
                    (index === currentQuestion ? { isCorrect } : null);
                  return (
                    <div
                      key={question.id}
                      className="flex items-center justify-between bg-white/70 rounded-xl p-4"
                    >
                      <span className="text-lg font-semibold">
                        Question {index + 1}
                      </span>
                      <div className="flex items-center">
                        {userAnswer?.isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {score < totalQuestions && (
                  <Button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <RotateCcw className="w-6 h-6 mr-2" />
                    Repeat Quiz
                  </Button>
                )}

                <Button
                  onClick={handleBackToFolders}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Folder className="w-6 h-6 mr-2" />
                  Back to Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Button
            onClick={handleBackToFolders}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Category
          </Button>

          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800">
              Question {currentQuestion + 1} of{" "}
              {questionsData[selectedFolder].length}
            </p>
            <div className="bg-blue-50 rounded-lg p-2 mt-2">
              <p className="text-blue-700 font-semibold text-sm">
                Points: {totalPoints}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="relative z-10 px-6 mb-8">
        <div className="container mx-auto max-w-4xl">
          <Progress
            value={
              ((currentQuestion + 1) / questionsData[selectedFolder].length) *
              100
            }
            className="h-4 bg-white/50 rounded-full"
          />
        </div>
      </div>

      {/* Quiz Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-blue-200">
          <CardContent className="p-8 md:p-12">
            {/* Navigation Buttons */}
            <div className="flex justify-between mb-8">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous Question
              </Button>

              <Button
                onClick={handleNext}
                disabled={
                  showFeedback &&
                  currentQuestion === questionsData[selectedFolder].length - 1
                }
                variant="outline"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
              >
                Next Question
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Question */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                {currentQuestion === 0
                  ? "Question 1"
                  : `Question ${currentQuestion + 1}`}
              </h2>

              {currentQuestion === 0 ? (
                <div className="bg-blue-50 p-6 rounded-xl mb-8">
                  <div className="text-lg text-gray-700 whitespace-pre-line leading-relaxed">
                    {questionsData[selectedFolder][currentQuestion].question}
                  </div>
                </div>
              ) : (
                <div className="text-xl text-gray-700 mb-8 text-center">
                  {questionsData[selectedFolder][currentQuestion].question}
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-4 mb-8">
              {questionsData[selectedFolder][currentQuestion].options.map(
                (option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`
                    p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                    ${
                      selectedAnswer === index
                        ? showFeedback
                          ? isCorrect
                            ? "bg-green-100 border-green-500 text-green-800"
                            : "bg-red-100 border-red-500 text-red-800"
                          : "bg-blue-100 border-blue-500 text-blue-800"
                        : showFeedback &&
                          index ===
                            questionsData[selectedFolder][currentQuestion]
                              .correctAnswer
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-gray-100 border-gray-300 text-gray-800 hover:bg-blue-50 hover:border-blue-300"
                    }
                  `}
                  >
                    <div className="flex items-center">
                      <div
                        className={`
                      w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold
                      ${
                        selectedAnswer === index
                          ? showFeedback
                            ? isCorrect
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                            : "bg-blue-500 text-white"
                          : showFeedback &&
                            index ===
                              questionsData[selectedFolder][currentQuestion]
                                .correctAnswer
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }
                    `}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="text-lg">{option}</div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center px-6 py-4 rounded-2xl text-xl font-semibold mb-4 ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-6 h-6 mr-2" />
                      🎉 Correct! +10 Points!
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 mr-2" />
                      😊 Not Quite Right, But Keep Your Spirits Up!
                    </>
                  )}
                </div>

                <p className="text-lg text-gray-700 mb-6">
                  {questionsData[selectedFolder][currentQuestion].explanation}
                </p>

                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-12 py-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
                >
                  {currentQuestion < questionsData[selectedFolder].length - 1
                    ? "Next Question 🚀"
                    : "See Results 🏆"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Fun encouragement */}
      <div className="relative z-10 text-center py-8">
        <div className="flex justify-center space-x-4">
          <span className="text-3xl animate-bounce">🌟</span>
          <span className="text-3xl animate-pulse">💫</span>
          <span className="text-3xl animate-bounce delay-500">⭐</span>
          <span className="text-3xl animate-pulse delay-1000">✨</span>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          You're Studying Well! Keep Up the Good Work! 💪
        </p>
      </div>
    </div>
  );
};
export default Quiz;
