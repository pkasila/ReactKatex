export default interface ReactKatexProps {
  children: string;
  displayMode?: boolean;
  leqno?: boolean;
  fleqn?: boolean;
  throwOnError?: boolean;
  errorColor?: string;
  minRuleThickness?: number;
  colorIsTextColor?: boolean;
  macros?: any;
  maxSize?: number;
  maxExpand?: number;
  strict?: boolean | string;
  trust?: boolean | ((ctx: any) => boolean);
  output?: 'html' | 'mathml' | 'htmlAndMathml';
  globalGroup?: boolean;
}
