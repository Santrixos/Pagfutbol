import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Trophy, Users } from "lucide-react";
import PayPalButton from "@/components/PayPalButton";

export default function DonationsPage() {
  const [selectedAmount, setSelectedAmount] = useState("10.00");
  const [customAmount, setCustomAmount] = useState("");

  const donationTiers = [
    {
      amount: "5.00",
      title: "Aficionado",
      description: "Apoyo básico al proyecto",
      icon: <Heart className="h-5 w-5" />,
      perks: ["Acceso completo", "Actualizaciones"]
    },
    {
      amount: "15.00",
      title: "Seguidor Leal",
      description: "Apoyo dedicado",
      icon: <Star className="h-6 w-6" />,
      perks: ["Todo lo anterior", "Estadísticas premium", "Sin anuncios"]
    },
    {
      amount: "30.00",
      title: "Súper Fan",
      description: "Apoyo extraordinario",
      icon: <Trophy className="h-6 w-6" />,
      perks: ["Todo lo anterior", "Acceso anticipado", "Badge especial"]
    },
    {
      amount: "50.00",
      title: "Campeón",
      description: "Apoyo épico",
      icon: <Users className="h-7 w-7" />,
      perks: ["Todo lo anterior", "Reconocimiento especial", "Influencia en nuevas funciones"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-4">
            Apoya el Proyecto
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tu donación nos ayuda a mantener y mejorar esta plataforma de fútbol mexicano.
            ¡Gracias por ser parte de nuestra comunidad!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Tiers */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6">Niveles de Donación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {donationTiers.map((tier, index) => (
                <Card 
                  key={tier.amount}
                  className={`cursor-pointer transition-all duration-500 hover:scale-105 border-2 ${
                    selectedAmount === tier.amount 
                      ? 'border-red-500 bg-red-500/20' 
                      : 'border-gray-700 bg-black/50 hover:border-red-400'
                  }`}
                  onClick={() => setSelectedAmount(tier.amount)}
                >
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-2 text-red-500">
                      {tier.icon}
                    </div>
                    <CardTitle className="text-white text-xl">{tier.title}</CardTitle>
                    <CardDescription className="text-gray-400">{tier.description}</CardDescription>
                    <div className="text-3xl font-bold text-red-500">${tier.amount} USD</div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tier.perks.map((perk, perkIndex) => (
                        <div key={perkIndex} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          {perk}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom Amount */}
            <Card className="mt-6 border-gray-700 bg-black/50">
              <CardHeader>
                <CardTitle className="text-white">Cantidad Personalizada</CardTitle>
                <CardDescription className="text-gray-400">
                  Ingresa la cantidad que desees donar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="0.00"
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(e.target.value);
                    }}
                  />
                  <Button 
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      if (customAmount) {
                        setSelectedAmount(customAmount);
                      }
                    }}
                  >
                    Usar Esta Cantidad
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <Card className="border-red-500 bg-gradient-to-b from-red-950/50 to-black/50 sticky top-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Realizar Donación</CardTitle>
                <CardDescription className="text-gray-300">
                  Procesamiento seguro con PayPal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">
                    ${selectedAmount} USD
                  </div>
                  <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                    Donación Única
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">¿Por qué donar?</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Mantener servidores activos</li>
                      <li>• Agregar nuevas funciones</li>
                      <li>• Mejorar la experiencia</li>
                      <li>• Datos más actualizados</li>
                    </ul>
                  </div>

                  <div className="paypal-container bg-gray-900 p-4 rounded-lg">
                    <PayPalButton 
                      amount={selectedAmount}
                      currency="USD"
                      intent="CAPTURE"
                    />
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    Procesado de forma segura por PayPal.<br/>
                    Tus datos están protegidos.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Thank You Section */}
        <div className="mt-16 text-center">
          <Card className="border-gray-700 bg-black/30 backdrop-blur-sm">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-white mb-4">¡Gracias por tu apoyo!</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Cada donación, sin importar el tamaño, nos ayuda a seguir brindando 
                la mejor experiencia de fútbol mexicano. Eres parte esencial de esta comunidad.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}