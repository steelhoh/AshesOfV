import { AssetProvider } from "./context/AssetContext";
import { ShellLayout } from "./components/ShellLayout";
import { Stepper } from "./components/Stepper";
import { TypePicker } from "./components/TypePicker";
import { ModeSwitcher } from "./components/ModeSwitcher";
import { DynamicForm } from "./components/DynamicForm";
import { JsonPane } from "./components/JsonPane";
import { ValidationPanel } from "./components/ValidationPanel";
import { ActionBar } from "./components/ActionBar";
import { LibraryPanel } from "./components/LibraryPanel";
import { CardPreview } from "./components/CardPreview";
import { useAsset } from "./context/useAsset";

function Workspace() {
  const {
    state: {
      editor: { mode, step }
    }
  } = useAsset();

  return (
    <div className="space-y-6">
      <Stepper currentStep={step} />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="space-y-6 rounded-xl border border-slate-800 bg-slate-950/70 p-6 shadow-inner shadow-amber-500/10">
          <TypePicker />
          <ModeSwitcher />
          {mode === "form" ? <DynamicForm /> : <JsonPane />}
          <ValidationPanel />
          <ActionBar />
        </section>
        <LibraryPanel />
      </div>
      <CardPreview />
    </div>
  );
}

export default function App() {
  return (
    <AssetProvider>
      <ShellLayout>
        <Workspace />
      </ShellLayout>
    </AssetProvider>
  );
}
