function Loading() {
    return (
      <div 
        style={{
          backgroundColor: "#4f46e5", // Background color of the div
          width: "450px",
          height: "450px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img 
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" 
          alt="Loading..." 
          style={{ 
            width: "100%", 
            height: "100%"
          }} 
        />
      </div>
    );
  }
  
  export default Loading;
  