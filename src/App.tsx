import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Benefits } from '@/components/Benefits';
import { Simulador } from '@/components/Simulador';
import { BentoGrid } from '@/components/BentoGrid';
import { FAQ } from '@/components/FAQ';
import { Journal } from '@/components/Journal';
import { ContactSection, Testimonials } from '@/components/Testimonials';
import { ServicePage } from '@/components/ServicePage';
import { ScheduleModal } from '@/components/ScheduleModal';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { LogoStrip } from '@/components/LogoStrip';
import { parseHash, type Route } from '@/lib/router';
import { ProspectosPage } from '@/components/ProspectosPage';
import { Preloader } from '@/components/Preloader';

function App() {
  const [route, setRoute] = useState<Route>(parseHash());
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleService, setScheduleService] = useState<string | undefined>(undefined);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openSchedule = (service?: string) => {
    setScheduleService(service);
    setScheduleOpen(true);
  };

  const isServicePage = route.name === 'service';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Preloader />
      <Navbar onSchedule={() => openSchedule(undefined)} />

      <main>
        {route.name === 'prospectos' ? (
          <ProspectosPage />
        ) : isServicePage ? (
          <ServicePage slug={route.slug} onSchedule={() => openSchedule(undefined)} />
        ) : (
          <>
            <Hero onSchedule={() => openSchedule(undefined)} />
            <Marquee />
            <Benefits />
            <Simulador onContact={() => openSchedule(undefined)} />
            <LogoStrip />
            <BentoGrid />
            <Testimonials />
            <FAQ />
            <Journal onContact={() => openSchedule(undefined)} />
            <ContactSection onSchedule={() => openSchedule(undefined)} />
          </>
        )}
      </main>

      <Footer onSchedule={() => openSchedule(undefined)} />

      <ScheduleModal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        presetService={scheduleService}
      />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
