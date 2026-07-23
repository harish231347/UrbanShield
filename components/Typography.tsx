import React from 'react';
import { Text, TextProps } from 'react-native';

type Variant = 'display' | 'h1' | 'h2' | 'h3' | 'title' | 'body' | 'bodyS' | 'caption' | 'label';

const styles: Record<Variant, { fontFamily: string; fontSize: number; lineHeight: number }> = {
  display: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 34, lineHeight: 40 },
  h1: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 28, lineHeight: 34 },
  h2: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, lineHeight: 28 },
  h3: { fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 18, lineHeight: 24 },
  title: { fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 16, lineHeight: 22 },
  body: { fontFamily: 'Inter-Regular', fontSize: 15, lineHeight: 22 },
  bodyS: { fontFamily: 'Inter-Regular', fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: 'Inter-Medium', fontSize: 12, lineHeight: 16 },
  label: { fontFamily: 'Inter-SemiBold', fontSize: 12, lineHeight: 16 },
};

interface TypographyProps extends TextProps {
  variant?: Variant;
  children: React.ReactNode;
}

export function Typography({ variant = 'body', style, children, ...props }: TypographyProps) {
  return (
    <Text style={[styles[variant], style]} {...props}>
      {children}
    </Text>
  );
}

// Convenience components for each variant
function makeVariant(v: Variant) {
  return ({ style, children, ...props }: TypographyProps) => (
    <Typography variant={v} style={style} {...props}>
      {children}
    </Typography>
  );
}

Typography.display = makeVariant('display');
Typography.h1 = makeVariant('h1');
Typography.h2 = makeVariant('h2');
Typography.h3 = makeVariant('h3');
Typography.title = makeVariant('title');
Typography.body = makeVariant('body');
Typography.bodyS = makeVariant('bodyS');
Typography.caption = makeVariant('caption');
Typography.label = makeVariant('label');
