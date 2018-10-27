export const calculateLumFromRGB = color =>
    0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

/*

Luminance (standard for certain colour spaces): (0.2126*R + 0.7152*G + 0.0722*B) [1]
Luminance (perceived option 1): (0.299*R + 0.587*G + 0.114*B) [2]
Luminance (perceived option 2, slower to calculate):   sqrt( 0.299*R^2 + 0.587*G^2 + 0.114*B^2 )

*/
