const useTraverseTree = () => {

    function insertNode(tree, folderId, item, isFolder) {
        if(tree.id === folderId && tree.isFolder)
        { 
            tree.items = tree.items || []; // Ensure it's an array

            /// push add the item in array in last
            /// unshift add the item in array at first
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items: []
            })
            return tree;
        }
        /// for nested folder file creation will do dfs algo
        let latestNode = [];
        latestNode = tree.items.map((obj) => {
            return insertNode(obj, folderId, item, isFolder);
        });
        return { ...tree, items: latestNode };
    }
    function deleteNode(tree, folderId, isFolder) {
        if (!tree.items) return tree;
    
        const updatedItems = tree.items
          .map((child) => deleteNode(child, folderId))
          .filter((child) => child.id !== folderId); // Remove the node by id
    
        return { ...tree, items: updatedItems };
      }

    const renameNode = (tree, folderId, newFolderName, isFolder) => {
        if(!tree.items) return tree;

        const updatedItems = tree.items
                    .map((child) => {
                        if(child.id === folderId)
                        {

                            return {
                                ...child,
                                name: newFolderName,
                                isFolder
                              };
                        }
                        else{
                           return renameNode(child, folderId, newFolderName, isFolder)
                        }
                    })

        
        return { ...tree, items: updatedItems };
                    
    } 

    return { insertNode, deleteNode, renameNode };

}

export default useTraverseTree;