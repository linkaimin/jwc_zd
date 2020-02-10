/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
var arr = [];
function KthNode(pRoot, k)
{
    LDK(pRoot);
    return arr[k-1];
}
function LDR(root){
    if(root.left){
        LDR(root.left);
    }
   arr.push(root.val);
    if(root.right){
        LDR(root.right);
    }
}