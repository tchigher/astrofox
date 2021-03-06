import React from 'react';
import { Control, Option } from 'components/editing';
import { ToggleInput } from 'components/inputs';
import useEntity from 'components/hooks/useEntity';
import { inputValueToProps } from 'utils/react';

export default function BarSpectrumControl({ display, active, stageWidth, stageHeight }) {
  const {
    maxDecibels,
    minFrequency,
    maxFrequency,
    smoothingTimeConstant,
    width,
    height,
    shadowHeight,
    barWidth,
    barWidthAutoSize,
    barSpacing,
    barSpacingAutoSize,
    x,
    y,
    color,
    shadowColor,
    rotation,
    opacity,
  } = display.properties;

  const onChange = useEntity(display);

  function handleChange(props) {
    if (props.barWidthAutoSize !== undefined) {
      props.barWidth = props.barWidthAutoSize ? -1 : 1;
    } else if (props.barSpacingAutoSize !== undefined) {
      props.barSpacing = props.barSpacingAutoSize ? -1 : 1;
    }

    onChange(props);
  }

  return (
    <Control label="Bar Spectrum" active={active} display={display} onChange={handleChange}>
      <Option
        label="Max dB"
        type="number"
        name="maxDecibels"
        value={maxDecibels}
        min={-40}
        max={0}
        step={1}
        withRange
      />
      <Option
        label="Min Frequency"
        type="number"
        name="minFrequency"
        value={minFrequency}
        min={0}
        max={maxFrequency}
        step={10}
        withRange
      />
      <Option
        label="Max Frequency"
        type="number"
        name="maxFrequency"
        value={maxFrequency}
        min={minFrequency}
        max={22000}
        step={10}
        withRange
      />
      <Option
        label="Smoothing"
        type="number"
        name="smoothingTimeConstant"
        value={smoothingTimeConstant}
        min={0}
        max={0.99}
        step={0.01}
        withRange
      />
      <Option
        label="Width"
        type="number"
        name="width"
        value={width}
        min={0}
        max={stageWidth}
        withRange
      />
      <Option
        label="Height"
        type="number"
        name="height"
        value={height}
        min={0}
        max={stageHeight}
        withRange
      />
      <Option
        label="Shadow Height"
        type="number"
        name="shadowHeight"
        value={shadowHeight}
        min={0}
        max={stageWidth}
        withRange
      />
      <Option
        label="Bar Width"
        type={barWidthAutoSize ? null : 'number'}
        name="barWidth"
        value={barWidth}
        min={-1}
        max={stageWidth}
        disabled={barWidthAutoSize}
      >
        <ToggleInput
          label="Auto-size"
          name="barWidthAutoSize"
          value={barWidthAutoSize}
          onChange={inputValueToProps(handleChange)}
        />
      </Option>
      <Option
        label="Bar Spacing"
        type={barSpacingAutoSize ? null : 'number'}
        name="barSpacing"
        value={barSpacing}
        min={-1}
        max={stageWidth}
        disabled={barSpacingAutoSize}
      >
        <ToggleInput
          label="Auto-size"
          name="barSpacingAutoSize"
          value={barSpacingAutoSize}
          onChange={inputValueToProps(handleChange)}
        />
      </Option>
      <Option label="Bar Color" type="colorrange" name="color" value={color} />
      <Option label="Shadow Color" type="colorrange" name="shadowColor" value={shadowColor} />
      <Option
        label="X"
        type="number"
        name="x"
        value={x}
        min={-stageWidth}
        max={stageWidth}
        withRange
      />
      <Option
        label="Y"
        type="number"
        name="y"
        value={y}
        min={-stageHeight}
        max={stageHeight}
        withRange
      />
      <Option
        label="Rotation"
        type="number"
        name="rotation"
        value={rotation}
        min={0}
        max={360}
        withRange
        withReactor
      />
      <Option
        label="Opacity"
        type="number"
        name="opacity"
        value={opacity}
        min={0}
        max={1.0}
        step={0.01}
        withRange
        withReactor
      />
    </Control>
  );
}
