import React from "react";
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
} from "@udecode/plate-basic-marks";
import { createBlockquotePlugin } from "@udecode/plate-block-quote";
import { createCodeBlockPlugin } from "@udecode/plate-code-block";
import { Plate, type PlatePlugin, type Value } from "@udecode/plate-common";
import { createHeadingPlugin } from "@udecode/plate-heading";
import { createParagraphPlugin } from "@udecode/plate-paragraph";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { editableProps } from "@/plate/demo/editableProps";
import { Editor } from "@/components/plate-ui/editor";

import { basicEditorValue } from "./basic-plugins-components-demo";

const PlateEditor = () => {
  return (
    <Plate>
      <PlateContent placeholder="Type..." />
    </Plate>
  );
};

export default PlateEditor;
