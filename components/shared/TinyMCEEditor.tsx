import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const TinyMCEEditor: React.FC = ({field, editorRef}) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
      onInit={(evt, editor) => {
        // @ts-ignore
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
          "alignright alignjustify | bullist numlist | warningButton",
        content_style:
          "body { font-family:Inter; font-size:16px; background-color:#1D2032;}",
        skin: "oxide-dark",
        content_css: "dark",
        setup: (editor) => {
             const toWarningHtml = function (date) {
               return ( `|<div class="warning-box bg-[#20201E] border border-[#FFC700] rounded-[6px] p-2 text-white-100">WARNING LABEL</div>|`);
             };
            editor.ui.registry.addButton("warningButton", {
              text: "Create Warning",
              tooltip: "Create Warning",
              onAction: function (_) {
                editor.insertContent(toWarningHtml(new Date()));
              },
            });

        }
      }}
    />
  );
};

export default TinyMCEEditor;
