"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
const react_1 = __importDefault(require("react"));
const translater_1 = require("./translater");
// Learn how to write stories:
// https://web.docs.shopify.io/docs/guides/storybook/how-to-write-story-files
const meta = {
    component: translater_1.translater,
    parameters: {
        // Embedding Figma designs
        // The embed appears in the "Design" tab of the story
        // Learn more: https://pocka.github.io/storybook-addon-designs/?path=/docs/docs-figma-readme--page
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/...?node-id=...',
        },
    },
};
exports.default = meta;
// 👇 We create a "template" of how args map to rendering
const Template = (args) => <translater_1.translater {...args}/>;
// 👇 Each story then reuses that template
exports.Basic = Template.bind({});
// Story args
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
exports.Basic.args = {};
