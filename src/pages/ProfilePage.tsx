import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useTranslation } from '../hooks/useTranslation';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { extractApiErrorMessage, userApi } from '../services/api';

interface ProfileFormState {
  fullName: string;
  email: string;
  location: string;
}

const createFormState = (data: Partial<ProfileFormState>): ProfileFormState => ({
  fullName: data.fullName || '',
  email: data.email || '',
  location: data.location || '',
});

const ProfilePage: FC = () => {
  const { user, updateUser } = useAuthContext();
  const { t, language } = useTranslation();
  const [form, setForm] = useState<ProfileFormState>(createFormState({}));
  const [savedForm, setSavedForm] = useState<ProfileFormState>(createFormState({}));
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const locale = language === 'ru' ? 'ru-RU' : 'en-US';
  const displayName = user.fullName || user.name || user.username;
  const loadErrorFallback = language === 'ru' ? 'Не удалось загрузить профиль' : 'Failed to load profile';

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      setIsLoadingProfile(true);
      setSaveError(null);
      try {
        const { data } = await userApi.getMyProfile();
        if (!isMounted) return;

        const serverProfile = createFormState({
          fullName: data.fullName || data.username,
          email: data.email,
          location: data.location,
        });
        setForm(serverProfile);
        setSavedForm(serverProfile);
        updateUser({
          name: data.fullName || data.username,
          fullName: data.fullName,
          email: data.email || '',
          location: data.location,
          createdAt: data.createdAt || user.createdAt,
          updatedAt: data.updatedAt || user.updatedAt,
        });
      } catch (error: any) {
        if (!isMounted) return;
        const fallbackForm = createFormState({
          fullName: user.fullName || user.name || user.username,
          email: user.email,
          location: user.location,
        });
        setForm(fallbackForm);
        setSavedForm(fallbackForm);
        setSaveError(extractApiErrorMessage(error, loadErrorFallback));
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    };

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [user.id, language]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const isDirty =
    form.fullName !== savedForm.fullName ||
    form.email !== savedForm.email ||
    form.location !== savedForm.location;

  const handleChange =
    (field: keyof ProfileFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (saveSuccess) setSaveSuccess(null);
      if (saveError) setSaveError(null);
    };

  const handleSavePersonalInfo = async () => {
    setSaveError(null);
    setSaveSuccess(null);
    setIsSaving(true);

    try {
      const { data } = await userApi.updateMyProfile({
        fullName: form.fullName,
        email: form.email,
        location: form.location,
      });

      updateUser({
        name: data.fullName || data.username,
        fullName: data.fullName,
        email: data.email || '',
        location: data.location,
        updatedAt: data.updatedAt || new Date().toISOString(),
      });
      const nextSavedForm = createFormState({
        fullName: data.fullName || data.username,
        email: data.email,
        location: data.location,
      });
      setForm(nextSavedForm);
      setSavedForm(nextSavedForm);
      setSaveSuccess(t('profileSavedSuccess'));
      setIsEditingPersonal(false);
    } catch (error: any) {
      setSaveError(extractApiErrorMessage(error, t('profileSaveError')));
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartEditing = () => {
    setIsEditingPersonal(true);
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleCancelEditing = () => {
    setForm(savedForm);
    setIsEditingPersonal(false);
    setSaveError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
            <span className="text-3xl font-bold text-white">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('profile')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            {t('welcomeBack', { name: displayName })}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('profileSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('profilePersonalInfo')}
            </h3>
            {isLoadingProfile ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('profileLoading')}</p>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('profileDisplayName')}
                  </label>
                  {isEditingPersonal ? (
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={handleChange('fullName')}
                      className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">
                      {displayName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('profileUserName')}
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {user.username}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('profileEmail')}
                  </label>
                  {isEditingPersonal ? (
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="name@email.com"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user.email || t('profileNoEmail')}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('profileLocation')}
                  </label>
                  {isEditingPersonal ? (
                    <input
                      type="text"
                      value={form.location}
                      onChange={handleChange('location')}
                      className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t('profileLocationPlaceholder')}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user.location || t('profileNoLocation')}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('profileId')}
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium font-mono text-sm">
                    {user.id}
                  </p>
                </div>
              </div>
            )}

            {!isLoadingProfile && (
              <div className="mt-5 flex flex-wrap gap-2">
                {isEditingPersonal ? (
                  <>
                    <Button
                      onClick={handleSavePersonalInfo}
                      loading={isSaving}
                      disabled={!isDirty || isSaving}
                    >
                      {isSaving ? t('profileSaving') : t('profileSave')}
                    </Button>
                    <Button
                      onClick={handleCancelEditing}
                      variant="secondary"
                      disabled={isSaving}
                    >
                      {t('profileCancel')}
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleStartEditing} variant="outline">
                    {t('profileEdit')}
                  </Button>
                )}
              </div>
            )}

            {(saveError || saveSuccess) && (
              <div className="mt-4">
                {saveError && (
                  <div className="rounded-md bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 px-3 py-2 text-sm">
                    {saveError}
                  </div>
                )}
                {saveSuccess && (
                  <div className="rounded-md bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 px-3 py-2 text-sm">
                    {saveSuccess}
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('profileAccountInfo')}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('profileRegisteredAt')}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {formatDate(user.createdAt)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('profileUpdatedAt')}
                </label>
                <p className="text-gray-900 dark:text-white font-medium">
                  {formatDate(user.updatedAt)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t('profileStatus')}
                </label>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.active !== false
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {user.active !== false ? t('profileStatusActive') : t('profileStatusInactive')}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('profileSecurityHint')}
          </p>
        </Card>

      </div>
    </div>
  );
};

export default ProfilePage;
