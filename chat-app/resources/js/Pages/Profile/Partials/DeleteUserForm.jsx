import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Elimina Account</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Una volta che il tuo account è eliminato, tutte le sue risorse e i dati saranno eliminati
                    permanentemente. Prima di eliminare il tuo account, scarica eventuali dati o informazioni che desideri
                    conservare.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Elimina Account</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Sei sicuro di voler eliminare il tuo account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Una volta che il tuo account è eliminato, tutte le sue risorse e i dati saranno eliminati
                        permanentemente. Inserisci la tua password per confermare che desideri eliminare definitivamente
                        il tuo account.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Annulla</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Elimina Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
