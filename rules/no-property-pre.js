const types = require("@babel/types");
// console.log(types)
const expressionMap = [
  'AssignmentExpression', 
  'LogicalExpression', 
  'UnaryExpression',
  'UpdateExpression',
  'BinaryExpression',
  'ConditionalExpression',
  'SequenceExpression'
]

const checkNode = function(node){
  console.log(node)
  if(expressionMap.includes(node.parent.type)){
    if(!types.isLogicalExpression(node.parent)){
      checkNode(node.object)
    }else{
      console.log('aa')
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
        avoidMethod: " '{{name}}' is forbidden.",
      },
  },

  create: function(context) {
    return {
      'MemberExpression': (node) => {
        console.log('=================')
        // console.log(node)
        if(node.object.type !== 'ThisExpression'){
          console.log('+++++++')
          checkNode(node)
        }
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