import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import utils from './utils';
import ReactKatexProps from './props';

export default class ReactKatex extends React.Component<ReactKatexProps> {
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
    enforceOutput: false,
    breakLine: false,
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
    enforceOutput: PropTypes.bool,
    breakLine: PropTypes.bool,
  };

  constructor(props: ReactKatexProps) {
    super(props);
  }

  render(): ReactNode {
    const { children, ...rest } = this.props;

    // Check MathML support
    if (
      !rest.enforceOutput &&
      rest.output === 'mathml' &&
      !utils.hasMathMLSupport()
    ) {
      // If there is no MathML support and output is set to MathML-only,
      // then switch to HTML and MathML render
      rest.output = 'htmlAndMathml';
    }

    if (children === null || children === undefined) {
      return <span></span>;
    }

    const renderUs = utils.latexify(children, rest as ReactKatexProps);
    renderUs.unshift('');
    renderUs.unshift('span');
    // @ts-ignore
    return React.createElement.apply(null, renderUs);
  }
}
