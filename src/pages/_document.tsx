import React, { Fragment } from 'react';
import NextDocument, { DocumentContext } from 'next/document';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const materialUiSheets = new MaterialUiServerStyleSheets();

    try {
      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          <Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
          </Fragment>
        ]
      }
    } finally {}
  }
}
