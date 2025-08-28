import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      startScan();
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const stats = [
    { label: 'Файлов проверено сегодня', value: '1,247', color: 'text-primary' },
    { label: 'Угроз обнаружено', value: '23', color: 'text-red-400' },
    { label: 'Точность ИИ', value: '99.7%', color: 'text-secondary' },
    { label: 'Время анализа', value: '2.3с', color: 'text-blue-400' }
  ];

  const features = [
    {
      icon: 'Shield',
      title: 'Многоуровневое сканирование',
      description: 'Сочетание 70+ антивирусов и ИИ-анализа для максимальной защиты',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'Container',
      title: 'Виртуальная песочница',
      description: 'Безопасный запуск подозрительных файлов в изолированной среде',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: 'Cpu',
      title: 'ИИ-детекция',
      description: 'Нейросети обнаруживают новые угрозы и аномалии поведения',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'Zap',
      title: 'Мгновенный анализ',
      description: 'Результаты сканирования за секунды с детальными отчетами',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="relative z-10 border-b border-border/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SpectreScan
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Сканирование', 'Документация', 'Контакты', 'Статистика', 'API'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Увидь{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                скрытую угрозу
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 animate-slide-up">
              Проверка файлов с помощью ИИ и 70+ антивирусных движков.<br />
              Максимальная точность обнаружения вредоносного ПО.
            </p>

            {/* File Upload Zone */}
            <div className="max-w-2xl mx-auto animate-slide-up">
              <div
                className={`border-2 border-dashed rounded-lg p-12 transition-all duration-300 ${
                  isDragOver
                    ? 'border-primary bg-primary/10 scale-105'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center animate-float">
                    <Icon name="Upload" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Загрузите файл для сканирования</h3>
                  <p className="text-muted-foreground mb-6">
                    Поддерживаются файлы до 100 МБ: EXE, DLL, PDF, DOC, ZIP и другие
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 animate-pulse-glow"
                    onClick={startScan}
                  >
                    <Icon name="Scan" size={20} className="mr-2" />
                    Выбрать файл
                  </Button>
                </div>
              </div>

              {/* Scanning Progress */}
              {isScanning && (
                <Card className="mt-6 bg-card/50 backdrop-blur-sm animate-slide-up">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Сканирование...</span>
                      <span className="text-sm text-muted-foreground">{scanProgress}%</span>
                    </div>
                    <Progress value={scanProgress} className="mb-4" />
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span>Анализ с помощью ИИ и антивирусных баз</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors animate-fade-in">
                <CardContent className="pt-6">
                  <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Передовые технологии защиты
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Комплексный анализ файлов с использованием машинного обучения и традиционных методов обнаружения
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:scale-105 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon name={feature.icon as any} size={24} className="text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-12 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-primary-foreground" />
              </div>
              <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SpectreScan
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 SpectreScan. Защита нового поколения.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}