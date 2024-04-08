import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const TinyMCEEditor: React.FC = ({ field, editorRef, defaultValue }) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      onBlur={field.onBlur}
      onEditorChange={field.onChange}
      initialValue={defaultValue}
      init={{
        height: 216,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "codesample",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
        ],
        toolbar:
          "codesample | bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist | warningButton | errorButton | informationButton | link image media | removeformat | fullscreen",
        content_style:
          "body { font-family:Inter; font-size:16px; background-color:#1D2032;}",
        skin: "oxide-dark",
        content_css: "dark",
        setup: (editor) => {
          const toWarningHtml = function () {
            return `&#8203;<div class="warning-box" style="background-color: #20201E; border: 1px solid #FFC700; border-radius: 6px; margin: 20px 0; padding: 14px; color: #FFFFFF;">Add warning info here....</div>&#8203;`;
          };

          const toErrorHtml = function () {
            return `&#8203;<div class="error-box" style="background-color: rgba(255, 76, 63, 0.15); border: 1px solid #FF4C3F; border-radius: 6px; margin: 20px 0; padding: 14px; color: #FFFFFF;">Add error info here....</div>&#8203;`;
          };

          const toInformationHtml = function () {
            return `&#8203;<div class="information-box" style="background-color: rgb(66,187,255, 0.1); border: 1px solid #42BBFF; border-radius: 6px; margin: 20px 0; padding: 14px; color: #FFFFFF;">Add information info here....</div>&#8203;`;
          };

          editor.ui.registry.addButton("warningButton", {
            text: "Create Warning Label",
            tooltip: "Create Warning Label",
            onAction: function (_) {
              editor.insertContent(toWarningHtml());
            },
          });
          editor.ui.registry.addButton("errorButton", {
            text: "Create Error Label",
            tooltip: "Create Error Label",
            onAction: function (_) {
              editor.insertContent(toErrorHtml());
            },
          });
          editor.ui.registry.addButton("informationButton", {
            text: "Create Information Label",
            tooltip: "Create Information Label",
            onAction: function (_) {
              editor.insertContent(toInformationHtml());
            },
          });
        },
      }}
    />
  );
};

export default TinyMCEEditor;
