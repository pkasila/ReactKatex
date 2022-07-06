import katex from 'katex';
import React from 'react';
import ReactKatexProps from '../props';

interface midResult {
  string: string;
  type: string;
}

const latexify = (string: string, options: ReactKatexProps) => {
  const regularExpression =
    /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\]|\\\([\s\S]+?\\\)|\$[^$\\]*(?:\\.[^$\\]*)*\$/g;
  const blockRegularExpression = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\]/g;

  const stripDollars = (stringToStrip: string) =>
    stringToStrip[0] === '$' && stringToStrip[1] !== '$'
      ? stringToStrip.slice(1, -1)
      : stringToStrip.slice(2, -2);

  const getDisplay = (stringToDisplay: string) =>
    stringToDisplay.match(blockRegularExpression) ? 'block' : 'inline';

  const renderLatexString = (s: string, t: string) => {
    let renderedString;
    try {
      const opts: ReactKatexProps = Object.create(options);
      if (t === 'block') {
        opts.displayMode = true;
      }
      renderedString = katex.renderToString(s, opts);
    } catch (err) {
      console.error('couldn`t convert string', s);
      return s;
    }
    return renderedString;
  };

  const result: midResult[] = [];

  const latexMatch = string.match(regularExpression);
  const stringWithoutLatex = string.split(regularExpression);

  if (latexMatch) {
    stringWithoutLatex.forEach((s, index) => {
      result.push({
        string: s,
        type: 'text',
      });
      if (latexMatch[index]) {
        result.push({
          string: stripDollars(latexMatch[index]),
          type: getDisplay(latexMatch[index]),
        });
      }
    });
  } else {
    result.push({
      string,
      type: 'text',
    });
  }

  const processResult = (resultToProcess: midResult[]) => {
    return resultToProcess.map(r => {
      if (r.type === 'text') {
        return r.string;
      }
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: renderLatexString(r.string, r.type),
          }}
        />
      );
    });
  };

  return processResult(result);
};

export default latexify;
