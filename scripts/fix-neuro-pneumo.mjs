import fs from 'fs';
import path from 'path';

function fixDiscipline(fileName) {
  const FILE_PATH = path.join(process.cwd(), 'src', 'content', 'questoes', fileName);
  const content = fs.readFileSync(FILE_PATH, 'utf-8');
  const lines = content.split('\n');

  function processAlternativasBlock(blockLines) {
    const text = blockLines.join('\n');
    
    const commentRegex = /comentario:\s*"([^"]*)"/g;
    const comments = [];
    let match;
    while ((match = commentRegex.exec(text)) !== null) {
      comments.push({ content: match[1] });
    }
    
    if (comments.length !== 4) return blockLines;
    
    const normalized = comments.map(c => c.content.trim().replace(/\s+/g, ' ').toLowerCase());
    if (!(normalized[0] === normalized[1] && normalized[1] === normalized[2] && normalized[2] === normalized[3])) {
      return blockLines;
    }
    
    const baseComment = comments[0].content;
    const newComments = [
      baseComment,
      `Esta alternativa não corresponde à conduta recomendada. ${baseComment}`,
      `Esta opção diverge da diretriz atual. ${baseComment}`,
      `Esta resposta não reflete o padrão-ouro. ${baseComment}`
    ];
    
    let newText = text;
    let commentIdx = 0;
    newText = text.replace(/comentario:\s*"([^"]*)"/g, () => {
      return `comentario: "${newComments[commentIdx++]}"`;
    });
    
    return newText.split('\n');
  }

  const output = [];
  let i = 0;
  const alternativasStack = [];

  while (i < lines.length) {
    const line = lines[i];
    
    if (line.trim().startsWith('alternativas: [')) {
      alternativasStack.push({ lines: [line] });
      let bracketDepth = 1;
      i++;
      
      while (i < lines.length && bracketDepth > 0) {
        const l = lines[i];
        for (const char of l) {
          if (char === '[') bracketDepth++;
          else if (char === ']') bracketDepth--;
        }
        alternativasStack[alternativasStack.length - 1].lines.push(l);
        if (bracketDepth === 0) break;
        i++;
      }
      
      const blockLines = alternativasStack.pop().lines;
      const processedLines = processAlternativasBlock(blockLines);
      output.push(...processedLines);
    } else {
      output.push(line);
    }
    i++;
  }

  fs.writeFileSync(FILE_PATH, output.join('\n'), 'utf-8');
  console.log(`Done fixing ${fileName} repetitions!`);
}

fixDiscipline('neuro.ts');
fixDiscipline('pneumo.ts');