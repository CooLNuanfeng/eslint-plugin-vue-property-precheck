module.exports = {
  meta: {
      docs: {
        description: "no console.time()",
        category: "Fill me in",
        recommended: false
      },
      fixable: null,  // or "code" or "whitespace"
      schema: [
        // fill in your schema
      ],
      // 报错信息描述
      messages: {
        avoidMethod: "console method '{{name}}' is forbidden.",
      },
  },

  create: function(context) {
    return context.parserServices.defineTemplateBodyVisitor(
      // Event handlers for <script> or scripts. (optional)
      {
        Program(node) {

          console.log(node)
        }
      }
    )
  }
};