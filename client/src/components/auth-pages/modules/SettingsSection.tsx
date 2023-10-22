import { Label } from "@ui/label";
import { Switch } from "@/components/ui/switch";
import { settingsData } from "@/lib/constants";

const SettingsSection = () => {
  return (
    <div className="flex flex-row justify-center mb-6">
      <div className="rounded-xl bg-background shadow-xl w-full sm:w-9/12 p-4 flex flex-col items-center">
        <h1 className="mb-4 text-tertiary font-bold text-xl">Configuración</h1>
        <div className="flex flex-col items-center gap-3 sm:items-start sm:gap-5 w-full md:w-11/12 lg:w-1/2 mb-2">
          <div className="w-full space-y-5">
            {settingsData.map((setting) => {
              return (
                <div
                  key={setting.id}
                  className="flex items-center space-x-2 w-full gap-5 border-2 rounded-lg p-3"
                >
                  <div className="flex flex-col w-full">
                    <Label htmlFor={setting.id} className="text-md">
                      {setting.title}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    id={setting.id}
                    defaultChecked={setting.isActivated}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
