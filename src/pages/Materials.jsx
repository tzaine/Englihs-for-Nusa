import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Folder,
} from "lucide-react";

// Sample study materials data
const studyMaterials = {
  folder1: {
    name: "BAB 1",
    description: "What is Descriptive Text?",
    type: "images",
    materials: [
      {
        id: 1,
        title: "Definition",
        description: "Definition of Descriptive Text",
        content:
          "Descriptive text is a type of text that describes a person, an animal, a place, or a thing. It gives details so the readers can imagine the object clearly",
      },
      {
        id: 2,
        title: "Purpose",
        description: "Purpose of Descriptive Text",
        content:
          "The main purpose of descriptive text is to describe something in detail. It helps readers know the shape, color, size, character, or other special qualities of an object. Descriptive text can also be used to introduce Indonesian culture to the world, such as traditional dances, traditional ceremonies, traditional clothes, traditional houses, and many more.",
      },
      {
        id: 3,
        title: "Generic Structure",
        description: "Generic Structure of Descriptive Text",
        content:
          "• Identification → introduces the object we want to describe." +
          "\n" +
          "• Description → explains the parts, qualities, or characteristics of the object.",
      },
      {
        id: 4,
        title: "Language Features",
        description: "Language Features of Descriptive Text",
        imageUrl:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
        content:
          "• Use Simple Present Tense (is, are, has, have)." +
          "\n" +
          "• Use many adjectives (beautiful, big, small, traditional, friendly)." +
          "\n" +
          "• Use linking verbs like is, are, looks, seems.",
      },
      {
        id: 5,
        title: "Importance",
        description: "Importance of Learning Descriptive Text",
        imageUrl:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop",
        content:
          "Descriptive text is useful for students to practice describing objects in English. It is also important because through descriptive text we can share and promote Indonesian culture to other countries. By writing about traditional clothes, dances, houses, or ceremonies, we can make people from other nations understand and appreciate the richness of Indonesian culture.",
      },
    ],
  },
  folder2: {
    name: "Bab 2",
    description: "Materi Lanjutan",
    type: "subfolders",
    subfolders: {
      subbab1: {
        name: "Sub Bab 1",
        type: "images",
        description: "Examples",
        materials: [
          {
            id: 1,
            subtitle: "(Traditional Dance)",
            title: "Saman Dance",
            description:
              "Identification :" + "\n" +
              "Saman Dance is a traditional dance from Aceh, Indonesia. It is one of the most famous dances in the country and is often called the 'dance of a thousand hands.'",
            content:
              "Description :" + "\n" +
              "This dance is usually performed by a group of men and women who sit in a straight row on the floor. The dancers clap their hands, slap their chests, and move their heads and bodies in very fast rhythm. What makes the dance special is the way all the dancers move together in harmony, without any mistake, even though the movements are very quick. The costumes are usually colorful, with traditional Acehnese patterns. Saman Dance is not only an art performance, but also a way to show values of teamwork, unity, and discipline. It is usually performed during cultural festivals, national celebrations, and special occasions to welcome guests.",
          },
          {
            id: 2,
            subtitle: "(Traditional Ceremony)",
            title: "Ngaben Ceremony",
            description:
              "Identification :" + "\n" +
              "Ngaben is a traditional cremation ceremony from Bali. It is a very important ritual for Balinese Hindus because it shows respect to the dead and helps the spirit reach the afterlife.",
            content:
              "Description :" + "\n" +
              "During Ngaben, the body of the dead person is placed in a tall and colorful tower called 'Bade. The tower is carried by many people in a big procession to the cremation place. A sarcophagus in the shape of a cow or other sacred animal, made from wood and decorated beautifully, is also used. The ceremony is very lively with gamelan music, prayers, and offerings. Even though it is about death, Ngaben is not sad, but rather a celebration of life and a spiritual journey. For Balinese people, Ngaben is a symbol of their strong belief in reincarnation and respect for ancestors. Many foreign tourists also come to Bali to see this unique cultural tradition.",
          },
          {
            id: 3,
            subtitle: "(Traditional Weapon)",
            title: "Kris",
            description:
              "Identification :" + "\n" +
              "Kris is a traditional weapon from Java. It is more than just a weapon; it is also a symbol of power, courage, and spirituality in Javanese culture.",
            content:
              "Description :" + "\n" +
              "The kris has a special blade that is often wavy, although some are straight. The blade is made carefully by a traditional blacksmith and sometimes has patterns made from mixing metals. The handle of the kris is usually decorated with carvings of animals or traditional symbols, and some are covered with gold or jewels for kings and nobles. In the past, kris was used in battles and as a personal weapon for protection. Today, kris is mostly used in traditional ceremonies, such as weddings or cultural rituals. Many people also believe that a kris has spiritual power and can bring good luck or protection. Because of its cultural value, kris has been recognized by UNESCO as a Masterpiece of the Oral and Intangible Heritage of Humanity.",
          },
          {
            id: 4,
            subtitle: "(Traditional House)",
            title: "Rumah Gadang",
            description:
              "Identification :" + "\n" +
              "Rumah Gadang is a traditional house from West Sumatra. It is the traditional home of the Minangkabau people and is one of the most unique houses in Indonesia.",
            content:
              "Description :" + "\n" +
              "Rumah Gadang is very large and usually made of wood with beautiful carvings on the walls. Its most special feature is the roof, which is curved upward like buffalo horns. This shape is not only unique but also has deep meaning in Minangkabau culture, symbolizing strength and pride. Inside the house, there are many rooms that can be shared by large families, because Minangkabau people usually live together in extended families. The house is also built on stilts to protect it from floods and wild animals. Rumah Gadang is not just a place to live, but also a symbol of Minangkabau traditions, family values, and social life. Until today, it is still used for cultural ceremonies and gatherings.",
          },
          {
            id: 5,
            subtitle: "(Traditional Costume)",
            title: "Kebaya",
            description:
              "Identification :" + "\n" +
              "Kebaya is a traditional dress for women in Indonesia. It is known for its beauty, elegance, and long history",
            content:
              "Description :" + "\n" +
              "Kebaya is usually made from thin fabric such as silk, lace, or cotton, and it is often decorated with embroidery or floral patterns. Women usually wear kebaya together with batik, sarong, or songket as the lower part. The dress fits closely to the body and shows the graceful posture of women. Kebaya is worn during special occasions like weddings, national ceremonies, Independence Day celebrations, and other important cultural events. In the past, kebaya was considered a formal dress for noble women, but today it is worn by all Indonesian women with pride. Kebaya is more than just a piece of clothing; it is a symbol of Indonesian identity, femininity, and cultural heritage that is admired by people all over the world.",
          },
        ],
      },
      subbab2: {
        name: "Sub Bab 2",
        description: "Indonesia Culture",
        type: "culture", // Menambahkan tipe khusus untuk budaya Indonesia
        materials: [
          {
            id: 1,
            title: "Traditional Dances of Indonesia",
            items: [
              {
                title: "Saman Dance – Aceh",
                imageUrl: "/dance/saman.jpg",
                description: `Saman Dance comes from Aceh, Sumatra. It is called the "dance of a thousand hands" because the dancers move their hands and bodies very fast together. This dance shows teamwork, discipline, and harmony.`,
              },
              {
                title: "Plate Dance (Tari Piring) – West Sumatra",
                imageUrl: "/dance/plate.jpg",
                description: `Plate Dance is a traditional dance from West Sumatra. The dancers hold plates in their hands while moving quickly and beautifully. It symbolizes gratitude and the hardworking spirit of the Minangkabau people.`,
              },
              {
                title: "Kecak Dance – Bali",
                imageUrl: "/dance/kecak.jpg",
                description: `Kecak Dance is a famous traditional dance from Bali. Many men sit in a circle, chanting "cak-cak-cak" while moving their hands. This dance tells stories from the Ramayana epic.`,
              },
              {
                title: "Mask Dance (Tari Topeng) – West Java",
                imageUrl: "/dance/mask.jpg",
                description: `Mask Dance comes from West Java. The dancer wears different masks to show various characters and emotions. It is often performed in cultural festivals and ceremonies.`,
              },
              {
                title: "Jaipong Dance – West Java",
                imageUrl: "/dance/jaipong.jpg",
                description: `Jaipong Dance is a lively dance from West Java. It has fast movements, strong rhythm, and is full of energy. The dance is usually performed to entertain people at celebrations.`,
              },
              {
                title: "Kecak Dance – Bali",
                imageUrl: "/dance/kecak.jpg",
                description: `Kecak Dance is a famous traditional dance from Bali. Many men sit in a circle, chanting "cak-cak-cak" while moving their hands. This dance tells stories from the Ramayana epic.`,
              },
              {
                title: "Reog Ponorogo Dance – East Java",
                imageUrl: "/dance/reog.jpg",
                description: `Reog is a traditional dance from Ponorogo, dxchh East Java. The main dancer wears a giant lion mask decorated with peacock feathers. This dance is dramatic and shows courage and strength.`,
              },
              {
                title: "Serimpi Dance – Yogyakarta",
                imageUrl: "/dance/serimpi.jpg",
                description: `Serimpi Dance is a classical dance from Yogyakarta. It is slow, elegant, and usually performed by four women. The dance shows beauty, grace, and harmony.`,
              },
              {
                title: "Legong Dance – Bali",
                imageUrl: "/dance/legong.jpg",
                description: `Legong Dance comes from Bali and is performed by young girls. The movements are delicate with expressive eyes, hands, and fingers. It is one of the most beautiful Balinese dances.`,
              },
              {
                title: "Cendrawasih Dance – Bali",
                imageUrl: "/dance/cendrawasih.jpg",
                description: `Cendrawasih Dance is inspired by the Bird of Paradise and comes from Bali. The dancers wear costumes with wings and move like flying birds. This dance shows the beauty of nature.`,
              },
              {
                title: "Gambyong Dance – Central Java",
                imageUrl: "/dance/gambyong.jpg",
                description: `Gambyong Dance is a traditional dance from Central Java. It has smooth and graceful movements, focusing on the dancer’s hands and body. The dance is usually performed to welcome guests at ceremonies.`,
              },
            ],
          },
          {
            id: 2,
            title: "Traditional Weapons of Indonesia",
            items: [
              {
                title: "Keris – Java",
                imageUrl: "/weapons/keris.jpg",
                description: `Keris is a traditional weapon from Java. It has a wavy blade and is often believed to have spiritual power. The keris is not only a weapon but also a symbol of bravery and honor.`,
              },
              {
                title: "Rencong – Aceh",
                imageUrl: "/weapons/rencong.jpg",
                description: `Rencong is a traditional dagger from Aceh. The blade is slightly curved, and it is usually carried on the waist. It represents courage and the pride of the Acehnese people.`,
              },
              {
                title: "Kujang – West Java",
                imageUrl: "/weapons/kujang.jpg",
                description: `Kujang comes from West Java and has a unique shape with curves and holes. It was used as both a farming tool and a weapon. The kujang also symbolizes wisdom and strength of the Sundanese people.`,
              },
              {
                title: "Mandau – Kalimantan (Dayak Tribe)",
                imageUrl: "/weapons/mandau.jpg",
                description: `Mandau is the traditional weapon of the Dayak people in Kalimantan. It is a long sword with carvings and sometimes decorated with animal hair. The mandau is used for hunting, war, and ceremonies.`,
              },
              {
                title: "Badik – South Sulawesi",
                imageUrl: "https://images.unsplash.com/photo-1588417149063-9b14fa6d937e?w=800&h=600&fit=crop",
                description: `Badik is a short weapon from South Sulawesi. It has a sharp blade and is often carried by Bugis and Makassar men. The badik represents honor, loyalty, and manhood.`,
              },
              {
                title: "Parang – Many Regions in Indonesia",
                imageUrl: "/weapons/parang.jpg",
                description: `Parang is a traditional machete used in many parts of Indonesia. It is used for cutting wood, farming, and as a weapon. The parang is simple but very useful in daily life.`,
              },
              {
                title: "Tombak – Across Indonesia",
                imageUrl: "/weapons/tombak.jpg",
                description: `Tombak, or spear, is a traditional weapon used in various regions of Indonesia. It has a long wooden handle with a sharp iron tip. It was used for hunting animals and in traditional battles.`,
              },
              {
                title: "Pedang Jenawi – Central Java",
                imageUrl: "/weapons/jenawi.jpg",
                description: `Pedang Jenawi is a long sword from Central Java. It was often used by royal soldiers in the past. This weapon represents power and authority.`,
              },
              {
                title: "Clurit – Madura",
                imageUrl: "/weapons/celurit.jpg",
                description: `Clurit is a sickle-shaped weapon from Madura. It is originally a farming tool but later became a weapon for self-defense. The clurit is a symbol of bravery for the Madurese people.`,
              },
              {
                title: "Siwar Panjang – South Sumatra",
                imageUrl: "/weapons/siwar.jpg",
                description: `Siwar Panjang is a traditional sword from South Sumatra. It has a long, sharp blade and is often carried during ceremonies. This weapon shows the strength and pride of the Palembang people.`,
              },
            ],
          },
          {
            id: 3,
            title: "Traditional Houses of Indonesia",
            items: [
              {
                title: "Rumah Gadang – West Sumatra",
                imageUrl: "/house/gadang.jpg",
                description: `Rumah Gadang is the traditional house of the Minangkabau people in West Sumatra. It has a roof shaped like buffalo horns. This house shows the matrilineal culture of Minangkabau society.`,
              },
              {
                title: "Rumah Joglo – Central Java",
                imageUrl: "/house/joglo.jpg",
                description: `Rumah Joglo is a traditional house from Central Java. It has a large roof with high wooden pillars. Joglo houses are usually built for Javanese nobles.`,
              },
              {
                title: "Rumah Tongkonan – Toraja, South Sulawesi",
                imageUrl: "/house/tongkonan.jpg",
                description: `Rumah Tongkonan comes from the Toraja people in South Sulawesi. The roof is shaped like a boat, and the house stands on wooden pillars. It is used for family gatherings and important ceremonies.`,
              },
              {
                title: "Rumah Honai – Papua",
                imageUrl: "/house/honai.jpg",
                description: `Rumah Honai is the traditional house of Papua. It is small, round, and made of wood and straw. This house keeps the people warm in the cold highlands.`,
              },
              {
                title: "Rumah Betang – Central Kalimantan",
                imageUrl: "/house/betang.jpg",
                description: `Rumah Betang is a longhouse from the Dayak people in Central Kalimantan. It is very large and can be lived in by many families together. This house shows the spirit of togetherness.`,
              },
              {
                title: "Rumah Limas – South Sumatra",
                imageUrl: "/house/limas.jpg",
                description: `Rumah Limas is a traditional wooden house from South Sumatra. The house has a pyramid-shaped roof and is built on stilts. It is often used for traditional ceremonies.`,
              },
              {
                title: "Rumah Baileo – Maluku",
                imageUrl: "/house/baileo.jpg",
                description: `Rumah Baileo is a traditional house from Maluku. It is big and open without walls. This house is used for meetings and cultural gatherings.`,
              },
              {
                title: "Rumah Panjang – West Kalimantan",
                imageUrl: "/house/panjang.jpg",
                description: `Rumah Panjang is a longhouse from West Kalimantan. Many families live together under one roof. It reflects the communal life of the Dayak people.`,
              },
              {
                title: "Rumah Kebaya – Betawi, Jakarta",
                imageUrl: "/house/kebaya.jpg",
                description: `Rumah Kebaya is the traditional house of the Betawi people in Jakarta. The roof looks like the folds of a kebaya, a traditional dress. The house is usually surrounded by a large yard.`,
              },
              {
                title: "Rumah Sasadu – North Maluku",
                imageUrl: "/house/sasadu.jpg",
                description: `Rumah Sasadu comes from the Sahu people in North Maluku. It is a big wooden house with a wide roof. This house is used for traditional events and community discussions.`,
              },
            ],
          },
          {
            id: 4,
            title: "Traditional Costumes of Indonesia",
            items: [
              {
                title: "Ulos – North Sumatra (Batak Tribe)",
                imageUrl: "/costumes/ulos.jpg",
                description: `Ulos is a traditional cloth from the Batak people in North Sumatra. It is usually handwoven with red, black, and white colors. Ulos is worn during weddings and traditional ceremonies as a symbol of blessing.`,
              },
              {
                title: "Baju Bodo – South Sulawesi",
                imageUrl: "/costumes/bodo.jpg",
                description: `Baju Bodo is the traditional dress of Bugis women in South Sulawesi. It is a colorful, square-shaped blouse made of thin fabric. This dress shows elegance and is usually worn during weddings.`,
              },
              {
                title: "Kebaya – Java",
                imageUrl: "/costumes/kebaya.jpg",
                description: `Kebaya is a traditional blouse worn by women in Java and Bali. It is usually combined with a batik skirt. Kebaya is a symbol of grace and femininity.`,
              },
              {
                title: "Beskap and Blangkon – Central Java",
                imageUrl: "/costumes/beskap.jpg",
                description: `Beskap is a traditional Javanese male costume, usually combined with a blangkon (headgear). It is often worn in formal or traditional events. This costume represents politeness and respect.`,
              },
              {
                title: "Payas Agung – Bali",
                imageUrl: "/costumes/payas.jpg",
                description: `Payas Agung is a traditional Balinese wedding costume. It is very colorful, decorated with gold accessories and a crown. This costume shows the beauty and richness of Balinese culture.`,
              },
              {
                title: "Baju Kurung – Riau",
                imageUrl: "/costumes/kurung.jpg",
                description: `Baju Kurung is a traditional costume from Riau and other Malay areas. It is a long blouse combined with a long skirt. This costume is simple but elegant and often worn during religious events.`,
              },
              {
                title: "Pakaian Dayak – Kalimantan",
                imageUrl: "/costumes/dayak.jpg",
                description: `Dayak traditional costume comes from Kalimantan. It is decorated with beads, feathers, and traditional patterns. This costume shows bravery and the closeness of the Dayak people to nature.`,
              },
              {
                title: "Pakaian Adat Sasak – Lombok, West Nusa Tenggara",
                imageUrl: "/costumes/sasak.jpg",
                description: `Sasak traditional costume is from Lombok. Men usually wear black clothing with a headscarf, while women wear colorful cloth with a sash. It is worn during traditional ceremonies and weddings.`,
              },
              {
                title: "Pakaian Adat Papua",
                imageUrl: "/costumes/papua.jpg",
                description: `Papuan traditional costumes are made from natural materials such as leaves, grass, and feathers. Men wear a koteka, while women wear skirts from sago leaves. These costumes show their strong connection with nature.`,
              },
              {
                title: "Baju Cele – Maluku",
                imageUrl: "/costumes/cele.jpg",
                description: `Baju Cele is the traditional costume from Maluku. It is usually red with golden stripes and combined with a sarong. People wear it during weddings and cultural celebrations.`,
              },
            ],
          },
          {
            id: 5,
            title: "Traditional Ceremony",
            items: [
              {
                title: "Ngaben – Bali",
                imageUrl: "/ceremony/ngaben.jpg",
                description: `Ngaben is a cremation ceremony in Bali. It is believed to release the soul of the dead to reach the next life. The ceremony is colorful, with music and traditional rituals.`,
              },
              {
                title: "Sekaten – Yogyakarta",
                imageUrl: "/ceremony/sekaten.jpg",
                description: `Sekaten is a traditional ceremony held in Yogyakarta to celebrate the birth of Prophet Muhammad. It includes gamelan music, markets, and cultural performances. Many people visit the palace during this event.`,
              },
              {
                title: "Kasada Festival – Tengger Tribe, East Java",
                imageUrl: "/ceremony/kasada.jpg",
                description: `Kasada is a ceremony of the Tengger people at Mount Bromo. Villagers throw offerings like rice, vegetables, and animals into the volcano. It shows gratitude and respect to their gods.`,
              },
              {
                title: "Tabuik – West Sumatra",
                imageUrl: "/ceremony/tabuik.jpg",
                description: `Tabuik is a traditional ceremony in Pariaman, West Sumatra. It commemorates the Islamic event of Ashura. Huge decorated structures are carried and paraded through the streets.`,
              },
              {
                title: "Rambu Solo – Toraja, South Sulawesi",
                imageUrl: "/ceremony/rambu.jpg",
                description: `Rambu Solo is a funeral ceremony of the Toraja people. It is very big, with buffalo sacrifices and traditional dances. This ceremony shows respect for the dead and family ties.`,
              },
              {
                title: "Melasti– Bali",
                imageUrl: "/ceremony/melasti.jpg",
                description: `The Melasti ceremony originates from Bali. It purifies both oneself and sacred temple objects.`,
              },
              {
                title: "Dugderan – Semarang, Central Java",
                imageUrl: "/ceremony/dugderan.jpg",
                description: `Dugderan is a traditional festival in Semarang to welcome the fasting month of Ramadan. It includes fireworks, parades, and a special puppet called Warak Ngendog. The event is very lively and joyful.`,
              },
              {
                title: "Seren Taun – West Java (Sundanese People)",
                imageUrl: "/ceremony/seren.jpg",
                description: `Seren Taun is a harvest festival celebrated by Sundanese farmers. They give thanks for the rice harvest and pray for a better year. Traditional music, dance, and food are part of the event.`,
              },
              {
                title: "Bakar Batu – Papua",
                imageUrl: "/ceremony/bakar.jpg",
                description: `Bakar Batu is a traditional feast of the Papuan people. Stones are heated, and then food like sweet potatoes and meat is cooked on them. It shows togetherness and gratitude.`,
              },
              {
                title: "Mappalili – South Sulawesi",
                imageUrl: "/ceremony/mappalili.jpg",
                description: `Mappalili is a traditional ceremony of Bugis farmers in South Sulawesi. It is held before planting rice as a prayer for a good harvest. The ceremony includes rituals, offerings, and cultural performances.`,
              },
            ],
          },
          {
            id: 6,
            title: "Sumber Gambar: Wikipedia Bahasa Indonesia, Kompas, Kompasiana, Kumparan, Wikipedia, Tribun Lombok, Perpustakaan Budaya Digital Indonesia, Tribunnews,",
          },
        ],
      },
      subbab3: {
        name: "Sub Bab 3",
        description: "List Vocabulary",
        type: "vocabulary",
        materials: [
          {
            id: 1,
            title: "A. Adjectives (Kata Sifat)",
            content: ` Beautiful = Indah
Unique = Unik
Traditional = Tradisional
Colorful = Berwarna-warni
Elegant = Anggun
Sacred = Sakral
Famous = Terkenal
Popular = Populer
Simple = Sederhana
Large = Besar
Small = Kecil
Tall = Tinggi
Short = Pendek
Long = Panjang
Curved = Melengkung
Strong = Kuat
Graceful = Anggun / Luwes
Historic = Bersejarah
Spiritual = Spiritual / Rohani
Decorative = Dekoratif / Hiasan`,
          },
          {
            id: 2,
            title: "B. Nouns – Culture (Kata Benda tentang Budaya)",
            content: ` Culture = Budaya
Tradition = Tradisi
Heritage = Warisan
Ceremony = Upacara
Festival = Festival
Celebration = Perayaan
Ritual = Ritual
Symbol = Simbol
Ancestor = Leluhur
Belief = Kepercayaan`,
          },
          {
            id: 3,
            title: "C. Nouns – Dance & Music (Tarian & Musik)",
            content: `Dance = Tarian
Dancer = Penari
Movement = Gerakan
Rhythm = Irama
Song = Lagu
Music = Musik
Drum = Drum / Kendang
Gamelan = Gamelan (alat musik Jawa & Bali)
Performance = Pertunjukan
Stage = Panggung`,
          },
          {
            id: 4,
            title: "D. Nouns – Traditional Ceremony (Upacara Adat)",
            content: `Offering = Sesajen
Prayer = Doa
Spirit = Roh
Tower = Menara
Fire = Api
Procession = Prosesi
Temple = Pura / Candi
Priest = Pendeta
Ritual place = Tempat ritual
Crowd = Kerumunan`,
          },
          {
            id: 5,
            title: "E. Nouns – Traditional Weapon (Senjata Tradisional)",
            content: `Weapon = Senjata
Blade = Bilah
Handle = Pegangan
Shield = Perisai
Spear = Tombak
Sword = Pedang
Dagger = Belati
Decoration = Hiasan
Warrior = Prajurit / Kesatria
Power = Kekuatan`,
          },
          {
            id: 6,
            title: "F. Nouns – Traditional House (Rumah Adat)",
            content: `House = Rumah
Roof = Atap
Wall = Dinding
Window = Jendela
Door = Pintu
Room = Ruangan
Stilt = Tiang (penopang rumah panggung)
Family = Keluarga
Wood = Kayu
Horn = Tanduk`,
          },
          {
            id: 7,
            title: "G. Nouns – Traditional Clothes (Pakaian Adat)",
            content: `Clothes = Pakaian
Dress = Gaun / Baju
Fabric = Kain
Batik = Batik
Sarong = Sarung
Songket = Songket
Kebaya = Kebaya
Crown = Mahkota
Jewelry = Perhiasan
Ornament = Ornamen`,
          },
          {
            id: 8,
            title: "H. Verbs (Kata Kerja)",
            content: `To describe = Mendeskripsikan
To wear = Memakai
To use = Menggunakan
To perform = Menampilkan
To dance = Menari
To celebrate = Merayakan
To respect = Menghormati
To pray = Berdoa
To believe = Percaya
To protect = Melindungi
To build = Membangun
To decorate = Menghias
To carry = Membawa
To carve = Mengukir
To play (music) = Memainkan (musik)
To gather = Berkumpul
To symbolize = Melambangkan
To represent = Mewakili
To honor = Menghormati
To admire = Mengagumi`,
          },
        ],
      },
    },
  },
};

const Materials = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("folders");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedSubfolder, setSelectedSubfolder] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCultureMaterial, setSelectedCultureMaterial] = useState(null);

  const folders = [
    {
      id: "folder1",
      name: "Deskriptive Text",
      description:
        "Let's learn what descriptive text in English easily!.",
      icon: "📚",
      bgColor: "from-blue-100 to-blue-200",
      borderColor: "border-blue-300",
    },
    {
      id: "folder2",
      name: "Indonesian Culture",
      description: "Inside this chapter, you'll explore culture through descriptive text",
      icon: "🖼️",
      bgColor: "from-green-100 to-green-200",
      borderColor: "border-green-300",
    },
  ];

  const handleFolderClick = (folderId) => {
    setSelectedFolder(folderId);
    if (folderId === "folder1") {
      setCurrentView("folder1");
      setCurrentImageIndex(0);
    } else if (folderId === "folder2") {
      setCurrentView("folder2");
    }
  };

  const handleSubfolderClick = (subfolderId) => {
    setSelectedSubfolder(subfolderId);
    setCurrentView("subfolder");
    setSelectedCultureMaterial(null);
  };

  const handleBackToFolders = () => {
    setCurrentView("folders");
    setSelectedFolder(null);
    setSelectedSubfolder(null);
    setSelectedCultureMaterial(null);
  };

  const handleBackToFolder2 = () => {
    setCurrentView("folder2");
    setSelectedSubfolder(null);
    setSelectedCultureMaterial(null);
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    const materials = studyMaterials.folder1.materials;
    if (currentImageIndex < materials.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const currentMaterial =
    selectedFolder === "folder1"
      ? studyMaterials.folder1.materials[currentImageIndex]
      : null;
  const currentSubfolderData = selectedSubfolder
    ? studyMaterials.folder2.subfolders[selectedSubfolder]
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-20 right-20 w-12 h-12 bg-pink-300 rounded-full opacity-20 animate-float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-300 rounded-full opacity-20 animate-float delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-20 animate-float delay-500"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-purple-300 rounded-full opacity-20 animate-float delay-1500"></div>
        <div className="absolute top-1/3 right-10 w-10 h-10 bg-indigo-300 rounded-full opacity-20 animate-float delay-3000"></div>
      </div>

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

          <div className="flex items-center space-x-4">
            <BookOpen className="w-6 h-6 text-amber-600" />
            <span className="text-lg font-semibold text-gray-800">
              Learning Materials
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Main Folders View */}
        {currentView === "folders" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Learning Materials
              </h1>
              <p className="text-xl text-gray-600">Pick a folder to explore</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {folders.map((folder) => (
                <Card
                  key={folder.id}
                  onClick={() => handleFolderClick(folder.id)}
                  className={`bg-gradient-to-br ${folder.bgColor} backdrop-blur-sm shadow-xl border-4 ${folder.borderColor} cursor-pointer transform hover:-translate-y-2 transition-all duration-300 text-center`}
                >
                  <CardContent className="p-8">
                    <div className="text-6xl mb-6">{folder.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {folder.name}
                    </h3>
                    <p className="text-gray-600">{folder.description}</p>
                    <div className="mt-4 bg-white/50 rounded-lg p-3">
                      <span className="text-gray-700 font-semibold">
                        {folder.id === "folder1"
                          ? `${studyMaterials.folder1.materials.length} Materi`
                          : `${
                              Object.keys(studyMaterials.folder2.subfolders)
                                .length
                            } Sub Bab`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Folder 1 - Image Gallery View */}
        {currentView === "folder1" && currentMaterial && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <Button
                onClick={handleBackToFolders}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Folder
              </Button>
            </div>

            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-blue-200">
              <CardContent className="p-0">
                <div className="flex items-center justify-center h-40 bg-blue-100">
                  <h2 className="text-3xl font-bold text-blue-800 text-center">
                    {currentMaterial.title}
                  </h2>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {currentMaterial.description}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                      {currentMaterial.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      onClick={handlePreviousImage}
                      disabled={currentImageIndex === 0}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={20} className="mr-1" />
                      Before
                    </Button>

                    <div className="flex space-x-2">
                      {studyMaterials.folder1.materials.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                            index === currentImageIndex
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={handleNextImage}
                      disabled={
                        currentImageIndex ===
                        studyMaterials.folder1.materials.length - 1
                      }
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight size={20} className="ml-1" />
                    </Button>
                  </div>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    {currentImageIndex + 1} From{" "}
                    {studyMaterials.folder1.materials.length} materials
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Folder 2 - Subfolders View */}
        {currentView === "folder2" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                onClick={handleBackToFolders}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Folder
              </Button>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Indonesian Culture
              </h1>
              <p className="text-lg text-gray-600">
                Select a sub-chapter to explore various cultural topics
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(studyMaterials.folder2.subfolders).map(
                ([key, subfolder]) => (
                  <Card
                    key={key}
                    onClick={() => handleSubfolderClick(key)}
                    className="bg-white/90 backdrop-blur-sm shadow-xl border-4 border-green-200 cursor-pointer transform hover:-translate-y-2 transition-all duration-300 text-center"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <BookOpen
                          size={48}
                          className="mx-auto text-green-500"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {subfolder.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {subfolder.description}
                      </p>
                      <div className="mt-4 bg-green-50 rounded-lg p-2">
                        <span className="text-green-700 font-semibold text-sm">
                          {subfolder.materials.length} Materials
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        )}

        {/* Subfolder Content View - Culture (Sub Bab 2) */}
        {currentView === "subfolder" && currentSubfolderData && currentSubfolderData.type === "culture" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                onClick={handleBackToFolder2}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Indonesia Culture
              </Button>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentSubfolderData.name}
              </h1>
              <p className="text-lg text-gray-600">
                {currentSubfolderData.description}
              </p>
            </div>

            {/* Grid Orange: Daftar Judul */}
            {!selectedCultureMaterial ? (
              <div className="grid md:grid-cols-2 gap-6">
                {currentSubfolderData.materials.map((material, idx) => (
                  <Card
                    key={material.id}
                    // Hanya aktifkan klik jika bukan id 6
                    onClick={material.id !== 6 ? () => setSelectedCultureMaterial(material) : undefined}
                    className={`bg-gradient-to-br from-orange-100 to-orange-200 backdrop-blur-sm shadow-xl border-4 border-orange-300 text-center
                      ${material.id !== 6 ? "cursor-pointer hover:-translate-y-2 transition-all duration-300" : "cursor-default"}
                    `}
                  >
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-orange-700 mb-2">
                        {material.title}
                      </h3>
                      {/* Hanya tampilkan "Click to View All" jika bukan id 6 */}
                      {material.id !== 6 && (
                        <p className="text-gray-600 text-base">
                          Click to View All
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Detail Pembahasan
              <div>
                <Button
                  onClick={() => setSelectedCultureMaterial(null)}
                  variant="outline"
                  className="mb-6 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to The Title List
                </Button>
                <h2 className="text-2xl font-bold text-orange-700 mb-6 text-center">
                  {selectedCultureMaterial.title}
                </h2>
                <div className="space-y-8">
                  {selectedCultureMaterial.items.map((item, idx) => (
                    <Card
                      key={idx}
                      className="bg-gradient-to-br from-orange-50 to-orange-100 shadow border-2 border-orange-200"
                    >
                      <CardContent className="p-6 flex flex-col md:flex-row items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-40 h-28 object-cover rounded-lg mb-4 md:mb-0 md:mr-6 border-2 border-orange-300"
                        />
                        <div>
                          <h4 className="text-lg font-bold mb-2 text-orange-800">
                            {item.title}
                          </h4>
                          <p className="text-gray-700 whitespace-pre-line">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Subfolder Content View - Vocabulary (Sub Bab 3) */}
        {currentView === "subfolder" && currentSubfolderData && currentSubfolderData.type === "vocabulary" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                onClick={handleBackToFolder2}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Indonesia Culture
              </Button>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentSubfolderData.name}
              </h1>
              <p className="text-lg text-gray-600">
                {currentSubfolderData.description}
              </p>
            </div>

            <div className="space-y-6">
              {currentSubfolderData.materials.map((material, index) => (
                <Card
                  key={material.id}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 backdrop-blur-sm shadow-xl border-4 border-blue-200"
                >
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4">
                      {material.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {material.content.split("\n").map((line, idx) => (
                        <div
                          key={idx}
                          className="flex items-start p-3 bg-blue-100 rounded-lg"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-300 rounded-full flex items-center justify-center mr-3 mt-1">
                            <span className="text-blue-800 text-sm font-bold">
                              {idx + 1}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {line}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Subfolder Content View - Images (Sub Bab 1) */}
        {currentView === "subfolder" && currentSubfolderData && currentSubfolderData.type === "images" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                onClick={handleBackToFolder2}
                variant="outline"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Indonesia Culture
              </Button>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentSubfolderData.name}
              </h1>
              <p className="text-lg text-gray-600">
                {currentSubfolderData.description}
              </p>
            </div>

            <div>
              {currentSubfolderData.materials.map((material, index) => (
                <Card
                  key={material.id}
                  className="bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-sm shadow-xl border-4 border-green-200 mb-8"
                >
                  <CardContent className="p-0">
                    {material.imageUrl && (
                      <img
                        src={material.imageUrl}
                        alt={material.title}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                    )}
                    <div className="p-8">
                      <div className="text-base text-gray-500 font-semibold mb-1">
                        {material.subtitle}
                      </div>
                      <h3 className="text-2xl font-bold text-green-800 mb-2">
                        {material.title}
                      </h3>
                      {material.description && (
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {material.description}
                        </h4>
                      )}
                      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                        {material.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fun elements */}
      <div className="relative z-10 text-center py-8">
        <div className="flex justify-center space-x-4">
          <span className="text-3xl animate-bounce">📚</span>
          <span className="text-3xl animate-pulse">📖</span>
          <span className="text-3xl animate-bounce delay-500">📝</span>
          <span className="text-3xl animate-pulse delay-1000">✏️</span>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          Reading is the Window to the World! Keep Learning! 🌟
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Materials;