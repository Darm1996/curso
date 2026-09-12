import Hero from '@/components/Hero';
import Dolor from '@/components/Dolor';
import Temario from '@/components/Temario';
import ParaQuien from '@/components/ParaQuien';
import Autor from '@/components/Autor';
import Faq from '@/components/Faq';
import Captura from '@/components/Captura';
import AvisoNormativo from '@/components/AvisoNormativo';
import Pie from '@/components/Pie';

export default function Pagina() {
  return (
    <main>
      <Hero />
      <Dolor />
      <Temario />
      <ParaQuien />
      <Autor />
      <Faq />
      <Captura />
      <AvisoNormativo />
      <Pie />
    </main>
  );
}
