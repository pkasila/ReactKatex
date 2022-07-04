import katex from 'katex';
import React, { ReactNode } from 'react';
import PropTypes, { InferProps } from 'prop-types';

interface midResult {
  string: string;
  type: string;
}

export interface ReactKatexOptions {
  children: ReactNode;
  displayMode: boolean;
  leqno: boolean;
  fleqn: boolean;
  throwOnError: boolean;
  errorColor: string;
  minRuleThickness: number;
  colorIsTextColor: boolean;
  macros: any;
  maxSize: number;
  maxExpand: number;
  strict: boolean | string;
  trust: boolean | ((ctx: any) => boolean);
  output: 'html' | 'mathml' | 'htmlAndMathml';
  globalGroup: boolean;
}

const latexify = (string: string, options: ReactKatexOptions) => {
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
      const opts: ReactKatexOptions = Object.create(options);
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

  // Returns list of spans with latex and non-latex strings.
  return processResult(result);
};

export default class ReactKatex extends React.Component<
  InferProps<typeof ReactKatex.propTypes>
> {
  static defaultProps = {
    children: '',
    displayMode: false,
    output: 'htmlAndMathml',
    leqno: false,
    fleqn: false,
    throwOnError: true,
    errorColor: '#cc0000',
    macros: {},
    minRuleThickness: 0,
    colorIsTextColor: false,
    strict: 'warn',
    trust: false,
  };

  static propTypes = {
    children: PropTypes.string,
    displayMode: PropTypes.bool,
    leqno: PropTypes.bool,
    fleqn: PropTypes.bool,
    throwOnError: PropTypes.bool,
    errorColor: PropTypes.string,
    macros: PropTypes.object,
    minRuleThickness: PropTypes.number,
    colorIsTextColor: PropTypes.bool,
    maxSize: PropTypes.number,
    maxExpand: PropTypes.number,
    strict: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.func,
    ]),
    trust: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    output: PropTypes.oneOf(['html', 'mathml', 'htmlAndMathml']),
  };

  render(): ReactNode {
    const { children, ...rest } = this.props;

    if (children === null || children === undefined) {
      return <span></span>;
    }

    const renderUs = latexify(
      children,
      Object.assign(Object.create(ReactKatex.defaultProps), rest)
    );
    renderUs.unshift('');
    renderUs.unshift('span');
    // @ts-ignore
    return React.createElement.apply(null, renderUs);
  }
}
