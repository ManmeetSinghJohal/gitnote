import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const TinyMCEEditor: React.FC = ({field, editorRef}) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      onBlur={field.onBlur}
      onEditorChange={field.onChange}
      initialValue=""
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
               return `<div class="warning-box bg-[#20201E] border border-[#FFC700] rounded-[6px] p-3.5 text-white-100">Add warning info here....</div>&#8203;`;
             };

              const toErrorHtml = function () {
                return `<div class="error-box bg-[#20201E] border border-[#FF4C3F] rounded-[6px] p-3.5 text-white-100">Add error info here....</div>&#8203;`;
              };

              const toInformationHtml = function () {
                return `<div class="information-box bg-[#20201E] border border-[#2E3757] rounded-[6px] p-3.5 text-white-100">Add information info here....</div>&#8203;`;
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

        }
      }}
    />
  );
};

export default TinyMCEEditor;
