/**
 * ================================================
 * CONFIGURACIÓN CLOUDINARY — BlendGo Pro Landing
 * Cloud: dltrz9yvn
 * ⚠️  API Secret solo para backend — nunca en frontend
 * ================================================
 */

const CLOUDINARY_CONFIG = {
  cloudName:    'dltrz9yvn',
  apiKey:       '842634977686672',
  uploadPreset: 'blendgo_landing',
  folder:       'blendgo-pro',

  transforms: {
    producto:   'q_auto,f_auto,w_600,h_700,c_pad,b_white',
    thumbnail:  'q_auto,f_auto,w_120,h_120,c_fill',
    hero:       'q_auto,f_auto,w_800,h_900,c_pad,b_white',
  }
};

/**
 * Genera URL optimizada de Cloudinary
 */
function cloudinaryUrl(publicId, transform = 'producto') {
  const t = CLOUDINARY_CONFIG.transforms[transform] || transform;
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${t}/${publicId}`;
}

/* ================================================
   IMÁGENES REALES — mapeadas por color
   Detectadas automáticamente desde tu Cloudinary
   ================================================ */
const CLOUDINARY_IMAGES = {

  verde: [
    cloudinaryUrl('LV1_qpcjmu'),
    cloudinaryUrl('LV2_qrewup'),
    cloudinaryUrl('LV3_fzjqsl'),
    cloudinaryUrl('LV4_sjwnvd'),
    cloudinaryUrl('LV5_ho3sq6'),
  ],

  azul: [
    cloudinaryUrl('LA1_tkour9'),
    cloudinaryUrl('LA2_ir45e3'),
    cloudinaryUrl('LA3_d7nltc'),
    cloudinaryUrl('LA4_inmxv9'),
  ],

  morado: [
    cloudinaryUrl('LM1_jczqbf'),
    cloudinaryUrl('LM2_nk2opq'),
    cloudinaryUrl('LM3_imdquj'),
    cloudinaryUrl('LM4_hwytaj'),
    cloudinaryUrl('LM5_bagpif'),
    cloudinaryUrl('LM6_trogbs'),
    cloudinaryUrl('LM7_wv2nhn'),
  ],

  // Sin imágenes aún → usa hue-rotate sobre verde como fallback
  rosa:    [],
  naranja: [],
  blanco:  [],
};

/**
 * Thumbnails por color (versión pequeña optimizada)
 */
function cloudinaryThumbs(color) {
  const imgs = CLOUDINARY_IMAGES[color] || [];
  return imgs.map(url =>
    url.replace(CLOUDINARY_CONFIG.transforms.producto, CLOUDINARY_CONFIG.transforms.thumbnail)
  );
}

/**
 * Imagen principal de un color
 */
function imagenPrincipalColor(color) {
  const imgs = CLOUDINARY_IMAGES[color];
  return (imgs && imgs.length > 0) ? imgs[0] : null;
}

/**
 * Todas las imágenes de un color
 */
function imagenesColor(color) {
  return CLOUDINARY_IMAGES[color] || [];
}

// ── Compatibilidad con admin.html (localStorage) ──
function guardarImagenesProducto(color, urls) {
  const stored = JSON.parse(localStorage.getItem('blendgo_images') || '{}');
  stored[color] = urls;
  localStorage.setItem('blendgo_images', JSON.stringify(stored));
}
function obtenerImagenesProducto() {
  return JSON.parse(localStorage.getItem('blendgo_images') || '{}');
}

// Exponer globalmente
window.CLOUDINARY_CONFIG      = CLOUDINARY_CONFIG;
window.CLOUDINARY_IMAGES      = CLOUDINARY_IMAGES;
window.cloudinaryUrl          = cloudinaryUrl;
window.cloudinaryThumbs       = cloudinaryThumbs;
window.imagenPrincipalColor   = imagenPrincipalColor;
window.imagenesColor          = imagenesColor;
window.guardarImagenesProducto = guardarImagenesProducto;
window.obtenerImagenesProducto = obtenerImagenesProducto;
