import React from 'react';
import renderer from 'react-test-renderer';
import ReactKatex from '../src';

describe('index', () => {
  describe('ReactKatex (HTML+MathML)', () => {
    it('Simple text and formula', () => {
      const component = renderer.create(
        <ReactKatex output={'htmlAndMathml'}>Example: $v = 2$</ReactKatex>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('Simple text and formula as block', () => {
      const component = renderer.create(
        <ReactKatex output={'htmlAndMathml'}>Example: $$v = 2$$</ReactKatex>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('Test on a physics problem', () => {
      const latex =
        'Две частицы, имеющие массы $m_1 = 2\\ г$ и $m_2 = 3\\ г$ и одинаковые заряды $q = 6\\ мкКл$, приближаются друг к другу. В некоторый момент они находятся на расстоянии $l = 30\\ м$ и имеют одинаковые скорости $v = 3\\ \\frac{м}{с}$. Найдите наименьшее расстояние $r_{min}$ между частицами в процессе движения. Коэффициент в законе Кулона $k = 9\\cdot10^9\\ \\frac{м}{Ф}$.';
      const component = renderer.create(
        <ReactKatex output={'htmlAndMathml'} children={latex}></ReactKatex>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('Test on a physics problem solution', () => {
      const latex = `
В тот момент, когда расстояние между частицами достигает максимального значения $r$, их скорости имеют одинаковую величину $u$ и одинаковое направление (относительная скорость равна нулю). Это состояние системы связано с начальным законами сохранения импульса и энергии:

$$m_1v-m_2v=(m_1+m_2)u$$

$\${\\frac{m_{1}v^{2}}{2}}+{\\frac{m_{2}v^{2}}{2}}+k{\\frac{q^{2}}{r_0}}={\\frac{(m_{1}+m_{2})u^{2}}{2}}+k{\\frac{q^{2}}{r}}$$

Отсюда получаем:

$$r=\\left(\\frac{1}{r_{o}}+\\frac{m_{1}m_{2}}{m_{1}+m_{2}}\\frac{2v^{2}}{k q^{2}}\\right)^{-1}=10\\ м.$$
      `;
      const component = renderer.create(
        <ReactKatex output={'htmlAndMathml'} children={latex}></ReactKatex>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
