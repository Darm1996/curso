import Hero from '@/components/Hero';
import Dolor from '@/components/Dolor';
import Temario from '@/components/Temario';
import ParaQuien from '@/components/ParaQuien';
import PorQueAhora from '@/components/PorQueAhora';
import Faq from '@/components/Faq';
import Captura from '@/components/Captura';
import AvisoNormativo from '@/components/AvisoNormativo';
import Pie from '@/components/Pie';

export default function Pagina() {
  return (
    <main>
      <Hero />
      <Dolor />
      <PorQueAhora />
      <Temario />
      <ParaQuien />
      <Faq />
      <Captura />
      <AvisoNormativo />
      <Pie />
    </main>
  );
}
