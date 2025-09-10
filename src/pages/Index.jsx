import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Gamepad2, QrCode, Star, Users, Trophy } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleStartLearning = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
            <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-20 animate-pulse delay-500"></div>
          </div>

          {/* Hero Image */}
          <div className="relative z-10 mb-8 animate-on-scroll">
            <img 
              src="/hero_background_2.png" 
              alt="Children learning English" 
              className="mx-auto max-w-md w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Hero Text */}
          <div className="relative z-10 animate-on-scroll">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-6 animate-pulse">
              Nusa Tales 
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
             Interative English Learning with Indonesian Culture
            </p>
            
            <Button 
              onClick={handleStartLearning}
              className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white text-xl px-12 py-6 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 animate-bounce"
            >
              🚀 Start Now!
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 animate-on-scroll">
            ✨ Key Features ✨
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-spin">
                  <Gamepad2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 mb-4">🎮 Interactive Quizzes</h3>
                <p className="text-gray-700 text-lg">
                  Fun quizzes with animations and scores that make learning exciting!
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-4">📚 Learning Materials</h3>
                <p className="text-gray-700 text-lg">
                  Inside this chapter, you’ll explore culture through descriptive texts: traditional Weapons, Traditional Dances, Traditional Clothes, Traditional Houses,  and Traditional Ceremonies.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                  <QrCode className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-4">🔐 Exclusive Access</h3>
                <p className="text-gray-700 text-lg">
                  Scan QR codes to get bonus stories and special adventures.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 animate-on-scroll">
            🏆 Achievements
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-on-scroll">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-orange-600 mb-2">10+</h3>
              <p className="text-xl text-gray-700">Happy Learners</p>
            </div>
            
            <div className="text-center animate-on-scroll">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Star className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-blue-600 mb-2">10+</h3>
              <p className="text-xl text-gray-700">Interactive Quizzes</p>
            </div>
            
            <div className="text-center animate-on-scroll">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-purple-600 mb-2">98%</h3>
              <p className="text-xl text-gray-700">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              🌟 Ready for an Advanture? 🌟
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Don’t wait! Join other kids in learning English through exciting cultural journeys across Indonesia.
            </p>
            
            <Button 
              onClick={handleStartLearning}
              className="bg-white text-purple-600 hover:bg-gray-100 text-2xl px-16 py-8 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 font-bold"
            >
              🎯 Join Now! 
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Nusa Tales</h3>
          <p className="text-gray-400 mb-6">Learning English the fun way, with the beauty of Nusantara culture.</p>
          <div className="flex justify-center space-x-6">
            <span className="text-3xl animate-bounce">🎈</span>
            <span className="text-3xl animate-pulse">🌈</span>
            <span className="text-3xl animate-bounce delay-500">🎨</span>
            <span className="text-3xl animate-pulse delay-1000">🎪</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

