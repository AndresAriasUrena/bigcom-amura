// lib/nota-images.ts
import aguademar from '../public/notas/aguademar.png';
import almizcle from '../public/notas/almizcle.png';
import almizcleblanco from '../public/notas/almizcleblanco.png';
import amaderado from '../public/notas/amaderado.png';
import ambar from '../public/notas/ambar.png';
import ambargris from '../public/notas/ambargris.png';
import avellana from '../public/notas/avellana.png';
import azafran from '../public/notas/azafran.png';
import bergamota from '../public/notas/bergamota.png';
import canela from '../public/notas/canela.png';
import caramelo from '../public/notas/caramelo.png';
import cardamomo from '../public/notas/cardamomo.png';
import cedro from '../public/notas/cedro.png';
import chocolate from '../public/notas/chocolate.png';
import ciruela from '../public/notas/ciruela.png';
import citricos from '../public/notas/cítricos.png';
import clavodeolor from '../public/notas/clavodeolor.png';
import comino from '../public/notas/comino.png';
import cuero from '../public/notas/cuero.png';
import especias from '../public/notas/especias.png';
import eucalipto from '../public/notas/eucalipto.png';
import frambuesa from '../public/notas/frambuesa.png';
import frutas from '../public/notas/frutas.png';
import incienso from '../public/notas/incienso.png';
import iris from '../public/notas/iris.png';
import jazmin from '../public/notas/jazmín.png';
import lavanda from '../public/notas/lavanda.png';
import lirio from '../public/notas/lirio.png';
import manzana from '../public/notas/manzana.png';
import manzanaverde from '../public/notas/manzanaverde.png';
import menta from '../public/notas/menta.png';
import miel from '../public/notas/miel.png';
import naranja from '../public/notas/naranja.png';
import neroli from '../public/notas/neroli.png';
import olibano from '../public/notas/olibano.png';
import oud from '../public/notas/oud.png';
import pachuli from '../public/notas/pachulí.png';
import pimientarosa from '../public/notas/pimientarosa.png';
import pina from '../public/notas/piña.png';
import polvora from '../public/notas/pólvora.png';
import resina from '../public/notas/resina.png';
import rosadebulgaria from '../public/notas/rosadebulgaria.png';
import rosaturca from '../public/notas/rosaturca.png';
import sandalo from '../public/notas/sándalo.png';
import tabaco from '../public/notas/tabaco.png';
import tomillo from '../public/notas/tomillo.png';
import vainilla from '../public/notas/vainilla.png';
import verde from '../public/notas/verde.png';
import vetiver from '../public/notas/vetiver.png';
import violeta from '../public/notas/violeta.png';

export const notasImages: { [key: string]: any } = {
  'aguademar': aguademar,
  'almizcle': almizcle,
  'almizcleblanco': almizcleblanco,
  'amaderado': amaderado,
  'ambar': ambar,
  'ambargris': ambargris,
  'avellana': avellana,
  'azafran': azafran,
  'bergamota': bergamota,
  'canela': canela,
  'caramelo': caramelo,
  'cardamomo': cardamomo,
  'cedro': cedro,
  'chocolate': chocolate,
  'ciruela': ciruela,
  'citricos': citricos,
  'clavodeolor': clavodeolor,
  'comino': comino,
  'cuero': cuero,
  'especias': especias,
  'eucalipto': eucalipto,
  'frambuesa': frambuesa,
  'frutas': frutas,
  'incienso': incienso,
  'iris': iris,
  'jazmin': jazmin,
  'lavanda': lavanda,
  'lirio': lirio,
  'manzana': manzana,
  'manzanaverde': manzanaverde,
  'menta': menta,
  'miel': miel,
  'naranja': naranja,
  'neroli': neroli,
  'olibano': olibano,
  'oud': oud,
  'pachuli': pachuli,
  'pimientarosa': pimientarosa,
  'pina': pina,
  'polvora': polvora,
  'resina': resina,
  'rosadebulgaria': rosadebulgaria,
  'rosaturca': rosaturca,
  'sandalo': sandalo,
  'tabaco': tabaco,
  'tomillo': tomillo,
  'vainilla': vainilla,
  'verde': verde,
  'vetiver': vetiver,
  'violeta': violeta
};

export const getNormalizedImageKey = (nota: string): string => {
  // Elimina espacios y convierte a minúsculas
  const normalized = nota.toLowerCase().replace(/\s+/g, '');
  
  // Mapeo de caracteres especiales
  const specialCharsMap: { [key: string]: string } = {
    'í': 'i',
    'á': 'a',
    'é': 'e',
    'ó': 'o',
    'ú': 'u',
    'ñ': 'n'
  };

  return normalized.split('').map(char => specialCharsMap[char] || char).join('');
};