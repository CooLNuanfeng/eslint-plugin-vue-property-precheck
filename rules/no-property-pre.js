const types = require("@babel/types");
// console.log(types)
const expressionMap = [
  'AssignmentExpression', 
  'UnaryExpression',
  'UpdateExpression',
  'BinaryExpression',
  'ConditionalExpression',
  'SequenceExpression'
]

const nodeMapKey = new Map()

// const checkNode = function(node, parent){
//   if(types.isLogicalExpression(parent)){
//     return {
//       status: (parent.left === node || parent.right === node),
//       name: node.object.name,
//       node: node,
//       parent: parent
//     }
//   }
//   return {
//     node: node,
//     name: node.object.name,
//     parent: parent,
//     status: false
//   }
// }



  // if(node.parent.type !== 'MemberExpression'){
  //   console.log('==>',sourceCode.getText(node))
  //   console.log(sourceCode.getText(node.parent))
  // }
  // else{
  //   // console.log(node.parent.object == node)
  //   console.log('+++',sourceCode.getText(node))
  //   console.log(sourceCode.getText(node.parent))
  // }
  
  // if(node.parent.type !== 'LogicalExpression'){
  //   context.report({
  //     node,
  //     messageId: 'avoidMethod',
  //     data: {
  //       name: `${sourceCode.getText(node.object)}`,
  //     },
  //   });
  // }else {
  //   console.log(sourceCode.getText(node.parent.left))
    
  // }
  

  
  // if(node.object && node.object.type === 'MemberExpression'){
  //   traverseNode(node.object)
  // }
  // if(node.object){
  //   return checkNode(node.object, node)
  // }


const checkNode = function(node, sourceCode){
  while(node.object){
    console.log(sourceCode.getText(node.object))
    checkNode(node.object, sourceCode)
  }
  console.log('end==>',sourceCode.getText(node))
}


const traverseNode = function(node, context){
  // console.log(node)
  if(node.object.type !== 'ThisExpression'){
    let sourceCode = context.getSourceCode(node)
    if(node.parent.type === 'AssignmentExpression'){
      console.log('AssignmentExpression==>',sourceCode.getText(node))
      console.log('left==>',sourceCode.getText(node.parent.left))
      console.log('right=>', sourceCode.getText(node.parent.right))
      if(node.parent.left.type === 'MemberExpression' && node.parent.left.object.type !== 'ThisExpression'){
        console.log('+++left+++')
        if(!nodeMapKey.has(node.parent.left)){
          nodeMapKey.set(node.parent.left, node.parent.left)
          context.report({
            node,
            messageId: 'avoidMethod',
            data: {
              name: `${sourceCode.getText(node.parent.left)}`
            },
          });
        }
        
        // traverseNode(node.parent.left, context)
        // console.log('+++left+++')
        // let parStr = sourceCode.getText(node.parent.left).replace(/\s+/g,'');
        // let childStr = sourceCode.getText(node.parent.left.object);
        // console.log(parStr,childStr,'====')
        // if(node.parent.left.object.type === 'MemberExpression'){
          
        // }
        
      }
      if(node.parent.right.type === 'MemberExpression' && node.parent.right.object.type !== 'ThisExpression'){
        // traverseNode(node.parent.right, context)
        console.log('+++right+++')
      }
  
    }else if(node.parent.type === 'LogicalExpression'){
      console.log('LogicalExpression==>',sourceCode.getText(node.object))
      console.log('logic parent==>', sourceCode.getText(node.parent))
      let parStr = sourceCode.getText(node.parent).replace(/\s+/g,'');
      let childStr = sourceCode.getText(node.object);
      let parentStrArr = parStr.split(node.parent.operator);
      console.log('parentStrArr==>', parentStrArr)
      console.log('include==>',parentStrArr.includes(childStr))
      if(!parentStrArr.includes(childStr)){
        context.report({
          node,
          messageId: 'avoidMethod',
          data: {
            name: `${sourceCode.getText(node.object)}`
          },
        });
      }
    }   
  }
}

module.exports = {
  meta: {
      docs: {
        description: "",
        category: "Fill me in",
        recommended: false
      },
      fixable: null,  // or "code" or "whitespace"
      schema: [
        // fill in your schema
      ],
      // 报错信息描述
      messages: {
        avoidMethod: "Get object properties, Make sure {{name}} exists",
      },
  },

  create: function(context) {
    return {
      'MemberExpression': (node) => {
        // console.log(node)
        traverseNode(node, context)
        
        // if(node.parent.parent.type !== 'LogicalExpression'){
        //   console.log('++++')
        // }
        // context.report({
        //     node,
        //     messageId: 'avoidMethod',
        //     data: {
        //         name: 'time',
        //     },
        // });
       },
    }
  }
};