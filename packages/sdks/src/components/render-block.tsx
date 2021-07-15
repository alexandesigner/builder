import { useState } from '@jsx-lite/core';
import { sizes } from '../constants/device-sizes.constant';
import { components } from '../functions/register-component';
import { BuilderBlock } from '../types/builder-block';

export type RenderBlockProps = {
  block: BuilderBlock;
};

// TODO: bindings
// TODO: responsive styles
export default function RenderBlock(props: RenderBlockProps) {
  const state = useState({
    get component() {
      return components[props.block.component?.name];
    },
    get componentInfo() {
      return this.component?.info;
    },
    get componentRef() {
      return this.component?.ref;
    },
    get tagName() {
      return props.block.tagName || 'div';
    },
    get properties() {
      return props.block.properties;
    },
    get css() {
      const styles = {
        ...props.block.responsiveStyles?.large,
      };

      if (props.block.responsiveStyles?.medium) {
        styles[`@media (max-width: ${sizes.medium}`] = props.block.responsiveStyles?.medium;
      }
      if (props.block.responsiveStyles?.small) {
        styles[`@media (max-width: ${sizes.medium}`] = props.block.responsiveStyles?.medium;
      }

      return styles;
    },
    get componentOptions() {
      return props.block.component?.options;
    },
  });

  return (
    <>
      {state.componentInfo?.noWrap && (
        <state.componentRef {...state.componentInfo?.options} css={state.css} />
      )}
      {!state.componentInfo?.noWrap && (
        <state.tagName {...state.properties} css={state.css}>
          {state.componentRef() && <state.componentRef {...state.componentOptions} />}
        </state.tagName>
      )}
    </>
  );
}