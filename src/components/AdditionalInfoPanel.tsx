function AdditionalInfoPanel() {
  return (
    <section className="panel additional-panel" id="config" aria-labelledby="additional-title">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Future space</p>
          <h2 id="additional-title">Additional Info</h2>
        </div>
      </div>
      <p>
        Update <code>src/data/*.json</code> to change dashboard content, then run{' '}
        <code>npm run check:config</code> before starting the app.
      </p>
    </section>
  );
}

export default AdditionalInfoPanel;
