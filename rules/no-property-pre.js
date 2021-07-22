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
  // console.log('111')
  if(node.parent.type === 'LogicalExpression' && node.type === 'MemberExpression'){
    let sourceCode = context.getSourceCode(node)
    let parStr = sourceCode.getText(node.parent).replace(/\s+/g,'');
    let childStr = sourceCode.getText(node.object);
    let parentStrArr = parStr.split(node.parent.operator);
    // console.log('ddd')
    if(!parentStrArr.includes(childStr) && node.object.type !== 'Identifier'){
      context.report({
        node,
        messageId: 'avoidMethod',
        data: {
          name: `${sourceCode.getText(node.object)}`
        },
      });
    }
  }else if(node.type === 'MemberExpression' && node.object.type !== 'Identifier'){
    context.report({
      node,
      messageId: 'avoidMethod',
      data: {
        name: `${sourceCode.getText(node.object)}`
      },
    });
  }
  // else if(node.object && node.object.type === 'MemberExpression'){
  //   context.report({
  //     node,
  //     messageId: 'avoidMethod',
  //     data: {
  //       name: `${sourceCode.getText(node.object.object)}`
  //     },
  //   });
  // } 
    
}

const traverseNode = function(node, context){
  // console.log('2222')
  if(node.object && node.object.type !== 'ThisExpression'){
    if(node.parent && node.parent.type === 'AssignmentExpression' && node.parent.right === node){
      reportMsgByNode(node, context)
    }else if(node.parent && node.parent.type === 'LogicalExpression'){
      let sourceCode = context.getSourceCode(node)
      let parStr = sourceCode.getText(node.parent).replace(/\s+/g,'');
      let childStr = sourceCode.getText(node.object);
      let parentStrArr = parStr.split(node.parent.operator);
      if(!parentStrArr.includes(childStr) && node.object.type !== 'Identifier'){
        context.report({
          node,
          messageId: 'avoidMethod',
          data: {
            name: `${sourceCode.getText(node.object)}`
          },
        });
      }
    }else if(expressionMap.includes(node.parent && node.parent.type)){
      reportMsgByNode(node, context) 
    }
  }
}


const traverseTemplateNode = function(node,context){
  // console.log('3333')
  if(node.type === 'MemberExpression'){ // 属性
    reportMsgByNode(node, context)
  }else if(node.type === 'LogicalExpression'){ // 与逻辑
    if(node.right){
      reportMsgByNode(node.right, context)
    }
    if(node.left){
      traverseTemplateNode(node.left, context)
    }
  }else if(node.type === 'ObjectExpression'){
    node.properties.forEach(itemNode=>{
      // console.log('aaa')
      if(itemNode.value.type === 'LogicalExpression'){
        traverseTemplateNode(itemNode.value, context)
      }else{
        reportMsgByNode(itemNode.value, context)
      }
    })
  }else if(node.type === 'VForExpression'){
    reportMsgByNode(node.right, context)
  }
  // else if(node.right){
  //   traverseNode(node.right, context)
  // }
}



module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "In the Vue project, when the multi-layer properties of the object are used in the code, eslint prompts to verify whether the object before the property exists",
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
        'VExpressionContainer': (node)=>{ //模板中的表达式
          traverseTemplateNode(node.expression, context)
        },
      },
      // Event handlers for <script> or scripts. (optional)
      {
        'MemberExpression': (node) => {
          let sourceCode = context.getSourceCode(node)
          let nodeStr = sourceCode.getText(node)
          if(!nodeStr.includes('this')){
            traverseNode(node, context)
          }
        },
      },
      // Options. (optional)
      {
          templateBodyTriggerSelector: "Program:exit"
      }
    )
  }
};