import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { explorer } from './data/folderData';
import Folder from './components/Folder';
import useTraverseTree from './hooks/use-traverse-tree'

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const {insertNode, deleteNode, renameNode} =  useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree)
  }
  const handleDeleteNode = (folderId, isFolder) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  }

  const handleRenameNode = (folderId, newFolderName, isFolder) => {
    const finalTree = renameNode(explorerData, folderId, newFolderName, isFolder)
    setExplorerData(finalTree);
  }
  return (
    <div>
      <Folder handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleRenameNode={handleRenameNode} explorerData={explorerData} />
    </div>
  );
}

export default App;
