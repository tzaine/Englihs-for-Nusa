import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Gamepad2, QrCode, Home, Star, Trophy, Heart } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Little Explorer");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Night";
  };

  const navigationItems = [
    {
      id: "quiz",
      title: "🎮 Quiz Practice",
      description: "Test your knowledge with 5 quiz packages!",
      icon: Gamepad2,
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      path: "/quiz",
      emoji: "🎯"
    },
    {
      id: "materials",
      title: "📚 Learning Materials",
      description: "Read cool stories and culturals from across Indonesia",
      icon: BookOpen,
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      path: "/materials",
      emoji: "📖"
    },
    {
      id: "qr",
      title: "🔐 Magic Door",
      description: "Unlock secret content with QR codes and explore hidden treasures of English and culture!",
      icon: QrCode,
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      path: "/qr-access",
      emoji: "🗝️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-20 right-20 w-12 h-12 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-green-300 rounded-full opacity-30 animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-30 animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-red-300 rounded-full opacity-30 animate-bounce delay-700"></div>
        <div className="absolute top-1/3 right-10 w-10 h-10 bg-indigo-300 rounded-full opacity-30 animate-pulse delay-300"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-2 border-gray-300 rounded-full px-6 py-3"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Homepage
          </Button>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">{currentTime.toLocaleTimeString()}</p>
            <p className="text-lg font-semibold text-gray-800">{currentTime.toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="relative z-10 py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl border-2 border-white/50">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-4xl">🤖</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4">
              {getGreeting()}, {userName}! 
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              🌟 Let’s start a fun adventure of learning English with the spirit of Indonesian culture! 🌟
            </p>
            
            <div className="flex justify-center space-x-4 mb-6">
              {/* <div className="flex items-center bg-blue-200 rounded-full px-4 py-2"> */}
                {/* <Trophy className="w-5 h-5 text-blue-600 mr-2" /> */}
                {/* <span className="text-blue-800 font-semibold">Poin: 0</span> */}
              {/* </div> */}
            </div>
            
            <p className="text-lg text-gray-600">
              Choose your adventure today!
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="relative z-10 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {navigationItems.map((item, index) => (
              <Card 
                key={item.id}
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 cursor-pointer bg-gradient-to-br ${item.bgColor} border-4 ${item.borderColor} animate-on-scroll`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => navigate(item.path)}
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 text-6xl opacity-10 transform rotate-12">
                    {item.emoji}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-24 h-24 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-spin shadow-lg`}>
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-700 text-lg mb-6">
                    {item.description}
                  </p>
                  
                  {/* Action Button */}
                  <Button 
                    className={`bg-gradient-to-r ${item.color} hover:shadow-lg text-white px-8 py-3 rounded-full transform group-hover:scale-110 transition-all duration-300 font-semibold`}
                  >
                    Start Now! 🚀
                  </Button>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="relative z-10 py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto shadow-xl border-2 border-white/50">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              🎈 Did You Know?  🎈
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl">
                <span className="text-4xl mb-4 block">🌍</span>
                <p className="text-gray-700 font-semibold">
                  English is spoken by more than 1.5 billion people worldwide
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl">
                <span className="text-4xl mb-4 block">💡</span>
                <p className="text-gray-700 font-semibold">
                  Learning languages can make your brain smarter and sharper!
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl">
                <span className="text-4xl mb-4 block">🌺</span>
                <p className="text-gray-700 font-semibold">
                  Indonesia’s culture makes learning more colorful and meaningful!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <span className="text-3xl animate-bounce">🎪</span>
            <span className="text-3xl animate-pulse">🎨</span>
            <span className="text-3xl animate-bounce delay-500">🎭</span>
            <span className="text-3xl animate-pulse delay-1000">🎯</span>
          </div>
          <p className="text-gray-600">
            Learning English the fun way, with the beauty of Nusantara culture.🌟
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

