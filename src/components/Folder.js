import { useState } from "react";

const Folder = ({handleInsertNode , handleDeleteNode, handleRenameNode, explorerData}) => {

    const [expand, setExpand] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editText, setEditText] = useState("");
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null,
    });

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        
        setExpand(true);
        setShowInput({
            visible: true,
            isFolder
        })
    }
    const handleDeleteFolder = (e, isFolder) => {
        e.stopPropagation();
        
        setShowInput({
            visible: false,
            isFolder
        })
        handleDeleteNode(explorerData.id, isFolder);
    }
    const handleRenameFolder = (e, isFolder) => {
        e.stopPropagation();
        setShowInput({
            visible: false,
            isFolder
        })
        setEditText(explorerData.name);
        setIsEditMode(true);        
    }
    const onRename = (e) => {
        if(e.keyCode === 13 && e.target.value)
        {
            handleRenameNode(explorerData.id, e.target.value, showInput.isFolder);
            setShowInput({
                ...showInput, 
                visible: false
            })
            setIsEditMode(false);
        }
    }
    const onAddFolder = (e) => {
        if(e.keyCode === 13 && e.target.value)
        {
            handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
            setShowInput({
                ...showInput, 
                visible: false
            })
        }
    }

    if(explorerData.isFolder)
    {
        return(
            <div className="container">
                <div className="folder" onClick={() => {setExpand(!expand)}}>
                    {
                        isEditMode ?
                         (
                             <input type="text" 
                                onKeyDown={onRename}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={() => setIsEditMode(false)}
                                 autoFocus
                             />
                        )
                        :
                        (
                            <span>
                                🗂️ {explorerData.name}
                            </span>
                        )
                    }
                    
                    <div>
                        <button onClick={(e) => {handleNewFolder(e, true)}}> Folder ⨁ </button>
                        <button onClick={(e) => {handleNewFolder(e, false)}}> File ⨁ </button>
                        <button onClick={(e) => {handleRenameFolder(e, true)}}> 🖊️ </button>
                        <button onClick={(e) => {handleDeleteFolder(e, true)}}> 🗑️ </button>
                    </div>
                </div>
                <div style={{display: expand? 'block' : "none", marginLeft: '10px'}}>
                    {
                        showInput.visible && (
                            <div className="inputContainer">
                                <span>
                                    {showInput.isFolder? " 🗂️ " : " 📑 "}
                                </span>
                                   
                                        <input type="text" 
                                            onKeyDown={onAddFolder}
                                            autoFocus
                                            onBlur={() => setShowInput({...showInput, visible: false})}
                                        />

                            </div>
                        )
                    }
                    {explorerData && explorerData.items.map((exp, idx) => (
                        // <span key={idx}>{exp.name}</span>
                        <Folder key={idx} handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleRenameNode={handleRenameNode} explorerData={exp} />
                    ))}
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="fileContainer">
                 {
                        isEditMode ?
                         (
                             <input type="text" 
                                onKeyDown={onRename}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={() => setIsEditMode(false)}
                                autoFocus
                             />
                        )
                        :
                        (
                            <span className="file">
                                🗂️ {explorerData.name}
                            </span>
                        )
                    }
                 <button onClick={(e) => {handleRenameFolder(e, false)}}> 🖊️ </button>
                 <button onClick={(e) => {handleDeleteFolder(e, false)}}> 🗑️ </button>
            </div>
        )
    }
   
}

export default Folder;