import { Navigate, Route, Routes } from "react-router-dom";
import { ApiHealthBadge } from "./components/ApiHealthBadge";
import { AudiobookPlayerPage } from "./pages/AudiobookPlayerPage";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { BookDiscoverySearchPage } from "./pages/BookDiscoverySearchPage";
import { ImmersiveReaderPage } from "./pages/ImmersiveReaderPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { PersonalLibraryPage } from "./pages/PersonalLibraryPage";
import { ProfileSettingsPage } from "./pages/ProfileSettingsPage";
import { ReadingStatsPage } from "./pages/ReadingStatsPage";
import { UserDashboardPage } from "./pages/UserDashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<UserDashboardPage />} />
        <Route path="/library" element={<PersonalLibraryPage />} />
        <Route path="/search" element={<BookDiscoverySearchPage />} />
        <Route path="/book/:libro_uri" element={<BookDetailsPage />} />
        <Route path="/listen/:libro_uri" element={<AudiobookPlayerPage />} />
        <Route path="/read/:libro_uri/:page" element={<ImmersiveReaderPage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
        <Route path="/stats" element={<ReadingStatsPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <ApiHealthBadge />
    </>
  );
}

export default App;
