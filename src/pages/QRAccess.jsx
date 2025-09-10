import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, QrCode, Scan, Lock, Key, Star, Sparkles } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRAccess = () => {
  const navigate = useNavigate();
  const [scannerActive, setScannerActive] = useState(false);
  const [scanAnimation, setScanAnimation] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    if (scannerActive) {
      const interval = setInterval(() => {
        setScanAnimation(prev => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [scannerActive]);

  const handleStartScanner = () => {
    setScannerActive(true);
    setScanResult(null);
  };

  useEffect(() => {
    let scanner;
    if (scannerActive) {
      scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );
      scanner.render(
        (result) => {
          setScanResult(result);
          setScannerActive(false);
          scanner.clear();
        },
        (error) => {
          // Optional: handle scan error
        }
      );
    }
    return () => {
      if (scanner) scanner.clear().catch(() => {});
    };
  }, [scannerActive]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-12 h-12 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-indigo-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-blue-300 rounded-full opacity-20 animate-bounce delay-500"></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-yellow-300 rounded-full opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-10 w-10 h-10 bg-green-300 rounded-full opacity-20 animate-bounce delay-300"></div>
        
        {/* Floating QR code elements */}
        <div className="absolute top-1/4 left-1/4 text-4xl opacity-10 animate-spin-slow">⬜</div>
        <div className="absolute top-3/4 right-1/4 text-3xl opacity-10 animate-spin-slow delay-1000">⬛</div>
        <div className="absolute bottom-1/4 left-3/4 text-5xl opacity-10 animate-spin-slow delay-2000">📱</div>
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
            <QrCode className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-semibold text-gray-800">
              Magic Door QR
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-purple-200">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <span className="text-6xl">🤖</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4">
                  Welcome to the Magic Door! 
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-700 mb-6">
                  🔮 Hello, young explorer! I am Robot Scanner, the guardian of this magic door! 🔮
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">
                  ✨ What is the Magic Door QR? ✨
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Magic Door QR is a special portal that helps you explore Indonesian culture.
                  With the right QR code, you can unlock interesting lessons about traditional houses, dances, clothes, weapons, and ceremonies from all around Indonesia!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scanner Section */}
          <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-indigo-200">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Scanner Interface */}
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-6">
                    🔍 Scanner QR 
                  </h3>
                  
                  <div className="relative w-64 h-64 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl border-4 border-dashed border-gray-400 flex items-center justify-center overflow-hidden">
                    {scannerActive ? (
                      <div id="qr-reader" style={{ width: "100%", height: "100%" }} />
                    ) : scanResult ? (
                      <div className="text-green-700 font-bold text-lg break-all">
                        Hasil Scan: {scanResult}
                      </div>
                    ) : (
                      <div className="text-center">
                        <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 font-semibold">
                          Scanner QR area
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Scan the QR code here!
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={handleStartScanner}
                    disabled={scannerActive}
                    className={`text-xl px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 ${
                      scannerActive 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:scale-105'
                    }`}
                  >
                    <Scan className="w-6 h-6 mr-2" />
                    {scannerActive ? 'Scanning...' : 'Start Scanner'}
                  </Button>
                </div>

                {/* Instructions */}
                <div className="space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-purple-800 mb-6">
                    📋 How to Use the Magic QR Scanner
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-2xl">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <div>
                        <h4 className="font-semibold text-blue-800">Open the Scan Feature</h4>
                        <p className="text-blue-700">PIn the app, choose the Scan feature.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-2xl">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <div>
                        <h4 className="font-semibold text-green-800">Scan the QR Code</h4>
                        <p className="text-green-700">Point your phone’s camera at the QR code.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-2xl">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <div>
                        <h4 className="font-semibold text-purple-800">Explore the Lesson!</h4>
                        <p className="text-purple-700">Right after scanning, you will see fun learning materials about Indonesian culture.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3 QR Cards Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* QR Card 1 */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-purple-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-purple-700 mb-2">QR Rumah Joglo</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material rumah joglo!
                </p>
                <img
                  src="/qr/joglo.jpeg"
                  alt="QR Rumah Betang"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-purple-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-purple-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-purple-700 mb-2">QR Rumah Betang</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material rumah betang!
                </p>
                <img
                  src="/qr/betang.jpg"
                  alt="QR Rumah Betang"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-purple-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
            {/* QR Card 2 */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-pink-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-pink-700 mb-2">QR Tari Tor-Tor</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material Tari Tor-Tor!!
                </p>
                <img
                  src="/qr/tor.jpg"
                  alt="QR Kelas 7B"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-pink-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-pink-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-pink-700 mb-2">QR Keris</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material Keris!!
                </p>
                <img
                  src="/qr/keris.jpg"
                  alt="QR Kelas 7B"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-pink-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-pink-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-pink-700 mb-2">QR Golok Betawi</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material Golok Betawi!!
                </p>
                <img
                  src="/qr/golok.jpg"
                  alt="QR Kelas 7B"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-pink-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-pink-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-pink-700 mb-2">QR Sekaten</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material Sekaten!!
                </p>
                <img
                  src="/qr/sekaten.jpg"
                  alt="QR Kelas 7B"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-pink-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-pink-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-pink-700 mb-2">QR Rambu Solo</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material Rambu Solo!!
                </p>
                <img
                  src="/qr/rambu.jpg"
                  alt="QR Kelas 7B"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-pink-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-pink-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-pink-700 mb-2">QR Bundo Kanduang</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material Bundo Kanduang!!
                </p>
                <img
                  src="/qr/bundo.jpg"
                  alt="QR Kelas 7B"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-pink-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-pink-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-pink-700 mb-2">QR Kebaya</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material Kebaya!!
                </p>
                <img
                  src="/qr/kebaya.jpg"
                  alt="QR Kelas 7B"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-pink-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-pink-200 flex flex-col items-center">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2x2 font-bold text-pink-700 mb-2">QR Tari Jaipong</h2>
                <p className="text-gray-700 text-center mb-4">
                  Scan this QR code to access the material Tari Jaipong!!
                </p>
                <img
                  src="/qr/jaipong.png"
                  alt="QR Kelas 7B"
                  className="w-100 h-100 object-contain rounded-lg border-2 border-pink-300 shadow-md mb-2"
                />
              </CardContent>
            </Card>
           
          </div>

          {/* Features Preview */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-4 border-pink-200">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-center text-pink-800 mb-8">
                🌟  Every QR code brings you closer to the beauty of Indonesian culture! 🌟 
              </h3>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fun elements */}
      <div className="relative z-10 text-center py-8">
        <div className="flex justify-center space-x-4">
          <span className="text-3xl animate-bounce">🔮</span>
          <span className="text-3xl animate-pulse">🗝️</span>
          <span className="text-3xl animate-bounce delay-500">🎪</span>
          <span className="text-3xl animate-pulse delay-1000">✨</span>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          An Adventure Awaits Behind Every QR Code! 🌟
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default QRAccess;

