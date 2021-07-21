const expressionMap = [
  'BinaryExpression',
  'ConditionalExpression',
  'IfStatement',
  'SequenceExpression',
  'UpdateExpression',
  'UnaryExpression',
]


const reportMsgByNode = function(node, context){
  let sourceCode = context.getSourceCode(node)
  if(node.type === 'MemberExpression' && node.object.type !== 'Identifier'){
      context.report({
        node,
        messageId: 'avoidMethod',
        data: {
          name: `${sourceCode.getText(node.object)}`
        },
      });
  }else if(node.object && node.object.type === 'MemberExpression'){
    context.report({
      node,
      messageId: 'avoidMethod',
      data: {
        name: `${sourceCode.getText(node.object.object)}`
      },
    });
  }  
}

const traverseNode = function(node, context){
  if(node.object.type !== 'ThisExpression'){
    if(node.parent.type === 'AssignmentExpression' && node.parent.right === node){
      reportMsgByNode(node, context)
    }else if(node.parent.type === 'LogicalExpression'){
      let sourceCode = context.getSourceCode(node)
      let parStr = sourceCode.getText(node.parent).replace(/\s+/g,'');
      let childStr = sourceCode.getText(node.object);
      let parentStrArr = parStr.split(node.parent.operator);
      if(!parentStrArr.includes(childStr)){
        context.report({
          node,
          messageId: 'avoidMethod',
          data: {
            name: `${sourceCode.getText(node.object)}`
          },
        });
      }
    }else if(expressionMap.includes(node.parent.type)){
      reportMsgByNode(node, context) 
    }
  }
}



const traverseTemplateNode = function(node,context){
  if(node.type === 'MemberExpression'){
    reportMsgByNode(node, context)
  }else if(node.right){
    traverseNode(node.right, context)
  }
}

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "When using the multi-layer properties of the object in the code, verify the existence of the pre-property of the object",
      category: "Fill me in",
      recommended: false
    },
    schema: [
      // fill in your schema
    ],
    messages: {
      avoidMethod: "Get object properties, Make sure {{name}} exists",
    },
  },

  create: function(context) {

    return context.parserServices.defineTemplateBodyVisitor(
      // Event handlers for <template>.
      {
          'VExpressionContainer': (node)=>{
            traverseTemplateNode(node.expression, context)
          }
      },
      // Event handlers for <script> or scripts. (optional)
      {
        'MemberExpression': (node) => {
          traverseNode(node, context)
        },
      },
      // Options. (optional)
      {
          templateBodyTriggerSelector: "Program:exit"
      }
    )
  }
};