import { AppShell } from "../layout/AppShell";

export function ProfileSettingsPage() {
  const profileFields = [
    { label: "First Name", value: "Alex" },
    { label: "Last Name", value: "Reader" },
  ];
  const formatOptions = [
    { icon: "headphones", title: "Audiobooks First", subtitle: "Prioritize listening experience", checked: true },
    { icon: "menu_book", title: "E-books First", subtitle: "Prioritize reading text", checked: false },
  ];
  const settingToggles = [
    { icon: "notifications", title: "Push Notifications", subtitle: "Receive reminders for your daily goals.", checked: true },
    { icon: "download", title: "Auto-Download", subtitle: "Download next chapter automatically via Wi-Fi.", checked: false },
  ];

  return (
    <AppShell theme="light" title="Settings">
      <div className="mx-auto max-w-[960px] p-6 pb-20 md:p-10">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white md:text-4xl">Settings</h1>
          <p className="text-base font-normal text-slate-500 dark:text-slate-400">Manage your account, reading preferences, and app experience.</p>
        </header>
        <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111418]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold leading-tight text-slate-900 dark:text-white">Account Details</h2>
            <button className="text-sm font-medium text-primary hover:underline">Edit Profile</button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {profileFields.map((field) => (
              <label key={field.label} className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{field.label}</span>
                <input className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-[#3b4554] dark:bg-[#1c2027] dark:text-white" defaultValue={field.value} type="text" />
              </label>
            ))}
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</span>
              <div className="group relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary">mail</span>
                <input className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-[#3b4554] dark:bg-[#1c2027] dark:text-white" defaultValue="alex.reader@example.com" type="email" />
              </div>
            </label>
          </div>
        </section>
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111418]">
            <h2 className="mb-4 text-xl font-bold leading-tight text-slate-900 dark:text-white">Daily Goal</h2>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">Set your daily reading or listening target.</p>
            <div className="flex items-center justify-center gap-4 py-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-[#282f39] dark:text-white dark:hover:bg-slate-700"><span className="material-symbols-outlined">remove</span></button>
              <div className="text-center">
                <span className="block text-4xl font-black text-primary">45</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">minutes / day</span>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-[#282f39] dark:text-white dark:hover:bg-slate-700"><span className="material-symbols-outlined">add</span></button>
            </div>
            <div className="mt-auto pt-6">
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-[#282f39]"><div className="h-full w-[75%] rounded-full bg-primary" /></div>
              <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">75% of users achieve this goal</p>
            </div>
          </section>
          <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111418]">
            <h2 className="mb-4 text-xl font-bold leading-tight text-slate-900 dark:text-white">Format Priority</h2>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">Choose which format you prefer to see first.</p>
            <div className="space-y-3">
              {formatOptions.map((option) => (
                <label key={option.title} className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-primary dark:border-[#3b4554] dark:bg-[#1c2027]">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${option.checked ? "bg-blue-100 text-primary dark:bg-blue-900/30" : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>
                      <span className="material-symbols-outlined">{option.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{option.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{option.subtitle}</p>
                    </div>
                  </div>
                  <input className="h-5 w-5 border-slate-300 text-primary focus:ring-primary" defaultChecked={option.checked} name="format_pref" type="radio" />
                </label>
              ))}
            </div>
          </section>
        </div>
        <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111418]">
          <h2 className="mb-6 text-xl font-bold leading-tight text-slate-900 dark:text-white">App Settings</h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {settingToggles.map((toggle) => (
              <div key={toggle.title} className="flex items-center justify-between py-4">
                <div className="flex gap-4">
                  <div className="text-slate-500 dark:text-slate-400"><span className="material-symbols-outlined">{toggle.icon}</span></div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{toggle.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{toggle.subtitle}</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input className="peer sr-only" defaultChecked={toggle.checked} type="checkbox" />
                  <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full dark:bg-slate-700" />
                </label>
              </div>
            ))}
            <div className="flex items-center justify-between py-4">
              <div className="flex gap-4">
                <div className="text-slate-500 dark:text-slate-400"><span className="material-symbols-outlined">dark_mode</span></div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Theme</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Customize the application appearance.</p>
                </div>
              </div>
              <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-[#1c2027]">
                <button className="rounded-md px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">Light</button>
                <button className="rounded-md bg-white px-3 py-1 text-xs font-medium text-primary shadow-sm dark:bg-[#282f39]">Dark</button>
                <button className="rounded-md px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400">Auto</button>
              </div>
            </div>
          </div>
        </section>
        <section className="rounded-xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/30 dark:bg-red-900/10">
          <h2 className="mb-2 text-lg font-bold leading-tight text-red-600 dark:text-red-400">Danger Zone</h2>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">Permanently delete your account and all reading data.</p>
            <button className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40">Delete Account</button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
