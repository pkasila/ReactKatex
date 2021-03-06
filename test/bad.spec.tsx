import React from 'react';
import renderer from 'react-test-renderer';
import ReactKatex from '../src';

describe('bad', () => {
  describe('ReactKatex (bad formed)', () => {
    it('Null or undefined children', () => {
      const component = renderer.create(<ReactKatex></ReactKatex>);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('No LaTex', () => {
      const component = renderer.create(
        <ReactKatex children={'Example'}></ReactKatex>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Test on a physics problem solution with break line enabled', () => {
      const latex = `
В тот момент, когда расстояние между частицами достигает максимального значения $r$, их скорости имеют одинаковую величину $u$ и одинаковое направление (относительная скорость равна нулю). Это состояние системы связано с начальным законами сохранения импульса и энергии:

$$m_1v-m_2v=(m_1+m_2)u$$

$\${\frac{m_{1}v^{2}}{2}}+{\\frac{m_{2}v^{2}}{2}}+k{\\frac{q^{2}}{r_0}}={\\frac{(m_{1}+m_{2})u^{2}}{2}}+k{\\frac{q^{2}}{r}}$$

Отсюда получаем:

$$r=\\left(\\frac{1}{r_{o}}+\\frac{m_{1}m_{2}}{m_{1}+m_{2}}\\frac{2v^{2}}{k q^{2}}\\right)^{-1}=10\\ м.$$
      `;
      const component = renderer.create(
        <ReactKatex
          breakLine={true}
          output={'mathml'}
          children={latex}
        ></ReactKatex>
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
