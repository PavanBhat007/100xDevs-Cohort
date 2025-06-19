function App() {
  //   return (
  //     <>
  //       <CardWrapper innerComponent={<TextComponent />} />
  //       <CardWrapper innerComponent={<TextComponent2 />} />
  //     </>
  //   );

  return (
    <>
      <CardWrapper>
        <TextComponent />
      </CardWrapper>
      <CardWrapper>
        <TextComponent2 />
      </CardWrapper>
    </>
  );
}

function TextComponent() {
  return <h1>Hi there :)</h1>;
}

function TextComponent2() {
  return (
    <>
      <h1>Hi there :)</h1>
      <h1>Hi there :)</h1>
    </>
  );
}

// Wrapper component
function CardWrapper({ children }) {
  console.log(children);
  return (
    <div style={{ border: "2px solid black", padding: 20 }}>{children}</div>
  );
}

export default App;
