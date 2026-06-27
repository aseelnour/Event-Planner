import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  /** Block closing via backdrop / Escape while true */
  closeDisabled?: boolean;
};

export function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  closeDisabled = false,
}: ModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !closeDisabled) {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, closeDisabled]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-[3px] transition-opacity"
        aria-label={t("modal.closeDialog")}
        disabled={closeDisabled}
        onClick={() => {
          if (!closeDisabled) onClose();
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_24px_48px_-12px_rgba(15,23,42,0.22)]"
      >
        <div className="shrink-0 border-b border-gray-50 bg-gradient-to-br from-white to-indigo-50/40 px-6 pb-5 pt-6">
          <div className="flex gap-4">
            {icon && (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/25">
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1 pt-0.5">
              <h2 className="text-lg font-bold tracking-tight text-gray-900">
                {title}
              </h2>
              {description && (
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-gray-100 bg-gray-50/90 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
